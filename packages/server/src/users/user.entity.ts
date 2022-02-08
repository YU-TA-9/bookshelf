import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  readonly id: number;

  @Column()
  @ApiProperty({ description: '姓' })
  lastName: string;

  @Column()
  @ApiProperty({ description: '名' })
  firstName: string;

  @Column()
  @ApiProperty({ description: 'Eメール' })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'パスワード' })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'アイコンURL' })
  iconUrl: string;

  @Column({ nullable: true, unique: true })
  @ApiProperty({ description: 'Google ID' })
  google_id: string;

  @CreateDateColumn()
  @ApiProperty({ description: '追加日' })
  readonly createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新日' })
  readonly updatedAt?: Date;
}
