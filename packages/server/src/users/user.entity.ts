import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../books/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

// passwordは除外
export type CurrentUser = Omit<User, 'password'>;

@Entity('users')
export class User {
  @Exclude()
  @PrimaryGeneratedColumn({ type: 'bigint' })
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

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'アイコンURL' })
  iconUrl: string;

  @Exclude()
  @Column({ nullable: true, unique: true })
  google_id: string;

  @Exclude()
  @OneToMany((type) => Book, (book) => book.id)
  books: Book[];

  @Exclude()
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Exclude()
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
