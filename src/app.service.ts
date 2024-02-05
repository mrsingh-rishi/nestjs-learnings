import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class AppService {
  helloWorld() {
    return 'API Is Working';
  }
}
