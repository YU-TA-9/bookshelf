import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Status, statusValues } from '../book.entity';

export class CreateBookSelfDto {
  @ApiProperty({ description: '書籍名' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '著者名' })
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: '出版社名' })
  @IsNotEmpty()
  publisher: string;

  @ApiProperty({
    description: '読書状態 1: 未読 2: 読書中 3: 読了 4: 中断',
    enum: statusValues,
  })
  @IsNotEmpty()
  status: Status;

  @ApiProperty({ description: 'カテゴリー' })
  @IsNotEmpty()
  category: number;

  @ApiProperty({ description: '画像パス' })
  @IsNotEmpty()
  image_path: string;
}
