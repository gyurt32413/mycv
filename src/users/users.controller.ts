import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Serialize } from './interceptor/serialize.interceptor';

// 放在這邊可以套用到所有的請求
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    await this.usersService.create(body.email, body.password);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log(`Finding user with id: ${id}`);

    const user = await this.usersService.findOne(parseInt(id));
    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    const users = await this.usersService.find(email);
    return users;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update(parseInt(id), body);
    return user;
  }
}
