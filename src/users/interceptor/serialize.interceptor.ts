import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): any;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run this code before the request is handled

    return next.handle().pipe(
      // map 是用來轉換資料的操作符，將原始資料轉換為指定的 DTO 類型
      map((data: any) => {
        // run this code after the request is handled
        return plainToInstance(this.dto, data, {
          // 只包含標記了 @Expose 的屬性
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
