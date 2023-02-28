import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log(context.switchToHttp().getRequest());
    return next.handle();
  }

  private log(req: any) {
    const { body, query, params, headers, user, method, route } = req;
    const log = {
      router: route,
      headers: {
        ...headers,
        authorization: ((headers.authorization as string) || '').slice(0, 12),
      },
      data: {
        body,
        query,
        params,
      },
      method,
      ip: req.ip,
      madeBy: user.username,
      timestamp: new Date().toISOString(),
    };
    this.logger.info(log);
  }
}
