import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'ISBNコード' })
  @IsNotEmpty()
  isbn: string;
}
