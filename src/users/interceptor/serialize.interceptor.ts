import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run this code before the request is handled
    console.log('SerializeInterceptor initialized', context);

    return next.handle().pipe(
      map((data: any) => {
        // run this code after the request is handled
        console.log('Intercepted data:', data);
      }),
    );
  }
}
