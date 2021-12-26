import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  /** ISBNコード */
  @IsNotEmpty()
  isbn: string;
}
