import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class QueueService {
    @Client({ transport: Transport.RMQ })
    public client: ClientProxy;

    public send(pattern: string, payload: any) {
        return this.client.send(pattern, payload).toPromise();
    }
}
