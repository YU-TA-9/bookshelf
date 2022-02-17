import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthenticatedRequest, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { PatchCategoryDto } from './dtos/patch-category.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Category, isArray: true })
  getCategories(@Req() req: AuthenticatedRequest): Promise<Category[]> {
    return this.categoriesService.getCategories(req.user);
  }

  @Post()
  @ApiCreatedResponse({ type: Category })
  createCategory(
    @Req() req: AuthenticatedRequest,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(req.user, createCategoryDto);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  patchCategoryStatus(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number,
    @Body() patchCategoryDto: PatchCategoryDto,
  ) {
    return this.categoriesService.updateCategory(
      req.user,
      id,
      patchCategoryDto,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteCategory(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    return this.categoriesService.deleteBook(req.user, id);
  }
}
