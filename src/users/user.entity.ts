import {
  AfterUpdate,
  AfterRemove,
  AfterInsert,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

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

  // AfterInsert 是 TypeORM 提供的生命週期事件裝飾器(hook)，會在實體被插入資料庫後觸發
  @AfterInsert()
  logInsert() {
    console.log(`User with id ${this.id} has been inserted`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User with id ${this.id} has been updated`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User with id ${this.id} has been removed`);
  }
}
