import { ApiProperty } from '@nestjs/swagger';

export class PatchBookCategoryDto {
  @ApiProperty({ description: 'カテゴリー' })
  category: number;
}
