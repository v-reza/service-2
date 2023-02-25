import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { ClientProxy, MessagePattern, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Injectable()
export class AppService  {
  private readonly logger = new Logger(AppService.name);
  

  // constructor() {
  //   this.client = ClientProxyFactory.create({
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: [process.env.RABBITMQ_URI],
  //       queue: 'service2_queue',
  //       queueOptions: {
  //         durable: false,
  //       }
  //     },
  //   });
  // }
  async getHello(): Promise<any> {
    // const someData = { someData: "Hello From Service2"}
    
    // return await this.client.send('SERVICE_2', someData).toPromise();
  }

  async logMessage(data: string) {
    this.logger.log('This message received from service1')
    this.logger.log(data)
  }

  async handleMessage(data: string): Promise<any> {
    console.log('Received data from service1: ', data);
    return { result: 'success' };
  }

  // onApplicationShutdown(signal?: string): void {
  //   console.log('Closing AMQP connection...');
  //   this.client.close();
  // }
}
