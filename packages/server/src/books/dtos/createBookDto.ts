import { IsNotEmpty } from 'class-validator';
import { Status } from '../book.entity';

export class CreateBookDto {
  @IsNotEmpty()
  name: string;
  author: string;
  publisher: string;
  status: Status;
  category: number;
  image_path: string;
}
