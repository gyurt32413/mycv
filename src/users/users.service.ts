import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  // 使用 Partial 表示滿足 User 其中部分屬性即可，這樣就可以只傳入要更新的屬性，而不需要傳入整個 User 物件
  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);

    // 使用 TypeORM 的 update 方法，這樣就不會觸發 entity 裡的生命週期事件(hook)，所以不建議使用
    // return this.repo.update(id, attrs);
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);

    // 使用 TypeORM 的 delete 方法，這樣就不會觸發 entity 裡的生命週期事件(hook)，所以不建議使用
    // return this.repo.delete(id);
  }
}
