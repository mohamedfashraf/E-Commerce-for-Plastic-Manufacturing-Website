import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, KafkaOptions, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private client: ClientKafka;

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    await this.kafkaClient.connect();
  }

  subscribeToResponseOf(pattern: string): void {
    this.kafkaClient.subscribeToResponseOf(pattern);
  }

  send(pattern: string, message: any): Observable<any> {
    return this.kafkaClient.send(pattern, message);
  }
}
