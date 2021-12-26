import { IsNotEmpty } from 'class-validator';
import { Status } from '../book.entity';

export class CreateBookSelfDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  publisher: string;

  @IsNotEmpty()
  status: Status;

  @IsNotEmpty()
  category: number;

  @IsNotEmpty()
  image_path: string;
}
