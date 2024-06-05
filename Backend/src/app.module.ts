import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserAuthModule } from './user-auth/user-auth.module';
import { JwtAuthMiddleware } from './common/middleware/jwt-auth.middleware'; // Import JwtAuthMiddleware
import { JwtModule } from '@nestjs/jwt';

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
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes('home'); // Apply middleware to Home routes
  }
}
