import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty({ description: '姓' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: '名' })
  @IsNotEmpty()
  firstName: string;
}
