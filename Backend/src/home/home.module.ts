import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddToFav, AddToFavSchema } from './models/addtofav.model';
import { HomeController } from './controllers/home.controller';
import { HomeService } from './services/home.service';
import { KafkaModule } from '../common/kafka.module';
import { KafkaService } from '../common/kafka.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AddToFav.name, schema: AddToFavSchema }]),
    KafkaModule,
  ],
  controllers: [HomeController],
  providers: [HomeService, KafkaService],
})
export class HomeModule {}
