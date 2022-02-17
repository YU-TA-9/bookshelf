import { ApiProperty } from '@nestjs/swagger';
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
import { User } from '../users/user.entity';

@Entity('categories')
export class Category {
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

  @Column()
  @ApiProperty({ description: 'カテゴリ名' })
  name: string;

  @Column()
  @ApiProperty({ description: 'カラーコード' })
  color: string;

  @Exclude()
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Exclude()
  @UpdateDateColumn()
  readonly updatedAt?: Date;

  constructor(userId?: number) {
    if (userId) {
      this.userId = userId;
    }
  }
}
