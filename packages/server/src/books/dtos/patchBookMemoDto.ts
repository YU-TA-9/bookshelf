import { ApiProperty } from '@nestjs/swagger';

export class PatchBookMemoDto {
  @ApiProperty({ description: 'メモ' })
  memo: string;
}
