import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserWithProviderDto {
  @ApiProperty({ description: 'プロバイダーで採番されている識別ID' })
  @IsNotEmpty()
  providerUserId: string;

  @ApiProperty({ description: '姓' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: '名' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Eメール' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'アイコンURL' })
  @IsNotEmpty()
  iconUrl: string;
}
