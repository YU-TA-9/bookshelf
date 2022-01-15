import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
}
