import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    return this.appService.getHello();
  }

  @MessagePattern('SERVICE_2')
  async receive(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    console.log("masuk kah data", data)
    return this.appService.handleMessage(data);
  }

  @MessagePattern('SERVICE_UP')
  async received(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    console.log("server up", data)
    return this.appService.handleMessage(data);
  }

  @MessagePattern('healthcheck')
  async healthCheck() {
    // Check if service is healthy
    const isHealthy = true;
    if (isHealthy) {
      return { status: 'ok' };
    } else {
      throw new Error('Service is down');
    }
  }

  // @MessagePattern('SERVICE_UPDATE')
  // async updateReceive(@Payload() data: any): Promise<any> {
  //   console.log({ updateRec: data });
  // }
}
