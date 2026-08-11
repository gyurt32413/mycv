import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  // 等同於
  // private repo: Repository<User>;
  // constructor(@InjectRepository(User) repo: Repository<User>) {
  //   this.repo = repo;
  // }

  create(email: string, password: string) {
    // create 方法會建立一個新的 User 實例，但不會立即存入資料庫
    const user = this.repo.create({ email, password });

    // save 方法會將 User 實例存入資料庫，並返回存入後的 User 實例
    return this.repo.save(user);

    // 另一種寫法，但如果用這種寫法，寫在 entity 裡的驗證就不會生效
    // return this.repo.save({ email, password });
  }
}
