import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Status } from '../book.entity';

export class PatchBookStatusDto {
  @ApiProperty({ description: '読書状態' })
  @IsNotEmpty()
  status: Status;
}
