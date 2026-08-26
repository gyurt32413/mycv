import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run this code before the request is handled

    return next.handle().pipe(
      map((data: any) => {
        // run this code after the request is handled
        return plainToClass(UserDto, data, {
          // 只包含標記了 @Expose 的屬性
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
