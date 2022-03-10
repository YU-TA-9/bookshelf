import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { CurrentUser } from '../users/user.entity';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { PatchCategoryDto } from './dtos/patch-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async getCategories(user: CurrentUser): Promise<Category[]> {
    return await this.categoriesRepository.find({ where: { userId: user.id } });
  }

  async getCategory(user: CurrentUser, id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id, {
      where: { userId: user.id },
    });
    if (!category) {
      throw new NotFoundException(`Not found with ${id}`);
    }

    return category;
  }

  async createCategory(
    user: CurrentUser,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new Category(user.id);
    const { name, color } = createCategoryDto;
    category.name = name;
    category.color = color;
    return await this.categoriesRepository.save(category);
  }

  async deleteBook(user: CurrentUser, id: number): Promise<void> {
    const category = await this.categoriesRepository.findOne(id, {
      where: { userId: user.id },
    });
    if (!category) {
      throw new NotFoundException(`Not found with ${id}`);
    }
    const result = await this.categoriesRepository.remove(category);

    // MEMO: Booksテーブルから削除したカテゴリ値を全部リセットする
    await this.booksRepository.update({ category: id }, { category: 0 });
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
    if (!category) {
      throw new NotFoundException(`Not found with ${id}`);
    }
    category.name = patchCategoryDto.name;
    category.color = patchCategoryDto.color;
    return await this.categoriesRepository.save(category);
  }
}
