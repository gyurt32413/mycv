import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// 將 scrypt 函數轉換為返回 Promise 的版本，以便使用 async/await
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    // 驗證 email 是否已存在
    const existingUser = await this.usersService.find(email);

    if (existingUser.length) {
      throw new BadRequestException('Email already in use');
    }

    // 產生 salt
    const salt = randomBytes(8).toString('hex');
    // 將密碼與 salt 組合後進行哈希處理
    // buffer.toString(encoding?, start?, end?)
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = `${salt}.${hash.toString('hex')}`;

    const user = await this.usersService.create(email, result);

    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }
}
