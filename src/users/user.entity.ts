import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 慣例命名 User 不用 UserEntity
@Entity()
export class User {
  // PrimaryGeneratedColumn 是 TypeORM 提供的裝飾器，用於標記這個欄位是主鍵並且自動生成
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
