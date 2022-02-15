import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export const CATEGORY_UNSET = 0;

export enum Status {
  /** 未読 */
  WAITING = 1,
  /** 読書中 */
  READING = 2,
  /** 読了 */
  COMPLETED = 3,
  /** 中断 */
  PENDING = 4,
}

export const statusValues = Object.keys(Status)
  .filter((k) => typeof Status[k] === 'number')
  .map((k) => Status[k]);

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty()
  id: number;

  @Exclude()
  @Column({ type: 'bigint', nullable: true })
  userId: number;

  @Exclude()
  @ManyToOne((type) => User, (user) => user.books, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ unique: true, nullable: true })
  @ApiProperty({ description: 'ISBNコード' })
  isbn: string;

  @Column()
  @ApiProperty({ description: '書籍名' })
  name: string;

  @Column()
  @ApiProperty({ description: '著者名' })
  author: string;

  @Column()
  @ApiProperty({ description: '出版社名' })
  publisher: string;

  @Column({ type: 'enum', enum: Status })
  @ApiProperty({
    description: '読書状態 1: 未読 2: 読書中 3: 読了 4: 中断',
    enum: statusValues,
  })
  status: Status;

  @Column()
  @ApiProperty({ description: 'カテゴリー(0 = "未設定")' })
  category: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: '画像パス' })
  image_path: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'メモ' })
  memo: string;

  @CreateDateColumn()
  @ApiProperty({ description: '追加日' })
  readonly createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新日' })
  readonly updatedAt?: Date;

  constructor(userId?: number) {
    if (userId) {
      this.userId = userId;
    }
  }
}
