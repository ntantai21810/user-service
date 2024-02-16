import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('POST_SERVICE') private readonly postClient: ClientKafka,
  ) {}

  async getHello() {
    return new Promise((resolve, reject) => {
      this.postClient.send('get_post', {}).subscribe({
        next: (result) => {
          resolve('user service hello ' + result);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  onModuleInit() {
    this.postClient.subscribeToResponseOf('get_post');
  }
}
