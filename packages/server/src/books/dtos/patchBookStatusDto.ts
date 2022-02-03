import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../book.entity';

export class PatchBookStatusDto {
  @ApiProperty({ description: '読書状態' })
  status: Status;
}
