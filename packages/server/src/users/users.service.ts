import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserWithProviderDto } from './dtos/create-user-with-provider.dto';
import { User } from './user.entity';

export enum Provider {
  LOCAL = 1,
  GOOGLE = 2,
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findOneWithProvider(
    provider: Provider,
    providerUserId: string,
  ): Promise<User | undefined> {
    let where;
    // TODO: 他Providerも追加
    switch (provider) {
      case Provider.GOOGLE:
        where = { google_id: providerUserId };
    }
    return await this.usersRepository.findOne({
      where: where,
    });
  }

  async createUserWithProvider(
    provider: Provider,
    dto: CreateUserWithProviderDto,
  ): Promise<User> {
    const user = new User();
    user.lastName = dto.lastName;
    user.firstName = dto.firstName;
    user.email = dto.email;
    user.iconUrl = dto.iconUrl;
    // TODO: 他Providerも追加
    switch (provider) {
      case Provider.GOOGLE:
        user.google_id = dto.providerUserId;
    }

    try {
      return await this.usersRepository.save(user);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        // TODO: 検討
        throw new ConflictException('Duplicated user');
      } else {
        throw new InternalServerErrorException('error');
      }
    }
  }
}
