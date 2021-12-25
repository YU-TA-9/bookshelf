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

@Entity()
export class Book implements IBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column({ type: 'simple-enum', enum: Status })
  status: Status;

  @Column()
  category: number;

  @Column()
  image_path: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
