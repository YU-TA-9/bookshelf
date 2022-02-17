import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'カテゴリー名' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'カラーコード' })
  @IsNotEmpty()
  color: string;
}
