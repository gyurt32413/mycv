import { IsEmail, IsString, IsOptional } from 'class-validator';

// @IsOptional() 裝飾器表示這個屬性是可選的，這樣就可以只傳入要更新的屬性，而不需要傳入整個 User 物件

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
