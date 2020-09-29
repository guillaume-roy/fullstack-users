import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import Axios from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class FranceRequestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const clientIp = this.getClientIP(context.switchToHttp().getRequest());

    if (this.isLocalhost(clientIp)) {
      return true;
    }

    return Axios.get(`https://ipapi.co/${clientIp}/country`).then(
      response => response.data === 'FR',
    );
  }

  public getClientIP(req: any) {
    return req.clientIp;
  }

  private isLocalhost(ip: string): boolean {
    return ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(ip);
  }
}
