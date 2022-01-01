import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IBook } from './book.interface';

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

@Entity()
export class Book implements IBook {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  author: string;

  @Column()
  @ApiProperty()
  publisher: string;

  @Column({ type: 'simple-enum', enum: Status })
  @ApiProperty({
    description: '1: 未読 2: 読書中 3: 読了 4: 中断',
    enum: statusValues,
  })
  status: Status;

  @Column()
  @ApiProperty()
  category: number;

  @Column()
  @ApiProperty()
  image_path: string;

  @CreateDateColumn()
  @ApiProperty()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  readonly updatedAt?: Date;
}
