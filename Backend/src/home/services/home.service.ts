import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddToFav } from '../models/addtofav.model';
import { KafkaService } from '../../common/kafka.service';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(AddToFav.name) private readonly addToFavModel: Model<AddToFav>,
    private readonly kafkaService: KafkaService,
  ) {}

  async addToFavorites(userId: string, productId: string): Promise<AddToFav> {
    const favorite = await this.addToFavModel.findOne({ userId: new Types.ObjectId(userId) }).exec();
    if (favorite) {
      favorite.products.push(new Types.ObjectId(productId));
      return favorite.save();
    } else {
      const newFavorite = new this.addToFavModel({ userId: new Types.ObjectId(userId), products: [new Types.ObjectId(productId)] });
      return newFavorite.save();
    }
  }

  async getAllProducts(): Promise<any> {
    return this.kafkaService.send('get-all-products', {});
  }

  async getProductsByCategory(category: string): Promise<any> {
    return this.kafkaService.send('get-products-by-category', { category });
  }

  async getFeaturedProducts(): Promise<any> {
    return this.kafkaService.send('get-featured-products', {});
  }
}
