import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentUser } from '../users/user.entity';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { PatchCategoryDto } from './dtos/patch-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(user: CurrentUser): Promise<Category[]> {
    return await this.categoriesRepository.find({ where: { userId: user.id } });
  }

  async getCategory(user: CurrentUser, id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id, {
      where: { userId: user.id },
    });
    if (!category) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found with ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return category;
  }

  async createCategory(
    user: CurrentUser,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new Category(user.id);
    const { name, color } = createCategoryDto;
    // TODO: WEBから使うようになったらISBNコードの保持を必須にするか検討する
    category.name = name;
    category.color = color;
    return await this.categoriesRepository.save(category);
  }

  async deleteBook(user: CurrentUser, id: number): Promise<void> {
    const category = await this.categoriesRepository.findOne(id, {
      where: { userId: user.id },
    });
    const result = await this.categoriesRepository.remove(category);
  }

  async updateCategory(
    user: CurrentUser,
    id: number,
    patchCategoryDto: PatchCategoryDto,
  ): Promise<Category> {
    // TODO: findOneとどちらを使うか統一する
    const category = await this.categoriesRepository.findOneOrFail(id, {
      where: { userId: user.id },
    });
    category.name = patchCategoryDto.name;
    category.color = patchCategoryDto.color;
    return await this.categoriesRepository.save(category);
  }
}
