import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthModule } from './user-auth/user-auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/SW-Projet-II'), UserAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
