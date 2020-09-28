import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import Axios from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class FranceRequestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }

    const clientIp = context.switchToHttp().getRequest().clientIp;
    return Axios.get(`https://ipapi.co/${clientIp}/country`)
      .then(response => response.data === 'FR');
  }
}
