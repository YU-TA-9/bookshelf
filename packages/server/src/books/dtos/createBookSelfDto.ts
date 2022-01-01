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

  @ApiProperty({ description: '読書状態' })
  @IsNotEmpty()
  status: Status;

  @ApiProperty({ description: 'カテゴリー', enum: statusValues })
  @IsNotEmpty()
  category: Status;

  @ApiProperty({ description: '画像パス' })
  @IsNotEmpty()
  image_path: string;
}
