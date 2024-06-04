import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserAuthModule } from './user-auth/user-auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/SW-Projet-II'),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'], // Example Kafka broker address
          },
          consumer: {
            groupId: 'my-consumer-group', // Set an appropriate consumer group
          },
        },
      },
    ]),
    UserAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
