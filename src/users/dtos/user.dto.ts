// 使用 class-transformer 的 Expose 裝飾器來控制序列化輸出，只有標記了 @Expose 的屬性會被包含在序列化結果中
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id!: number;

  @Expose()
  email!: string;
}
