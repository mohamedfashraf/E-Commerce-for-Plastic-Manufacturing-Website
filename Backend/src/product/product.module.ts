import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/product.model';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { KafkaModule } from '../common/kafka.module';
import { KafkaService } from '../common/kafka.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    KafkaModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, KafkaService],
})
export class ProductModule {}
