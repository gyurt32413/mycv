import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 慣例命名 User 不用 UserEntity
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
