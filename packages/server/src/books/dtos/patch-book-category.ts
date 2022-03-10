import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PatchBookCategoryDto {
  @ApiProperty({ description: 'カテゴリー' })
  @IsNotEmpty()
  category: number;
}
