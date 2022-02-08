import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginGoogleDto {
  @ApiProperty({ description: 'Googleトークン' })
  @IsNotEmpty()
  token: string;
}
