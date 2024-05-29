import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthModule } from './user-auth/user-auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/SW-Projet-II'),
    UserAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
