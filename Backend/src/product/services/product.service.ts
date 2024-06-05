import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../models/product.model';
import { KafkaService } from '../../common/kafka.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly kafkaService: KafkaService,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    const savedProduct = await newProduct.save();
    this.kafkaService.send('product_created', savedProduct);
    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).exec();
  }

  async findFeatured(): Promise<Product[]> {
    return this.productModel.find({ featured: true }).exec();
  }
}
