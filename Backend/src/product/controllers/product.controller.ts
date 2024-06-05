import { Controller, Get, Post, Body, Query, OnModuleInit } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { KafkaService } from '../../common/kafka.service';

@Controller('products')
export class ProductController implements OnModuleInit {
  constructor(
    private readonly productService: ProductService,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    await this.kafkaService.subscribeToResponseOf('get-all-products');
    await this.kafkaService.subscribeToResponseOf('get-products-by-category');
    await this.kafkaService.subscribeToResponseOf('get-featured-products');
    await this.kafkaService.connect();
  }

  @Get()
  async findAll(@Query('category') category?: string, @Query('featured') featured?: string): Promise<Product[]> {
    if (category) {
      return this.productService.findByCategory(category);
    } else if (featured) {
      return this.productService.findFeatured();
    }
    return this.productService.findAll();
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Get('kafka/all')
  async getAllProducts(): Promise<Product[]> {
    return this.kafkaService.send('get-all-products', {}).toPromise();
  }

  @Get('kafka/category')
  async getProductsByCategory(@Query('category') category: string): Promise<Product[]> {
    return this.kafkaService.send('get-products-by-category', { category }).toPromise();
  }

  @Get('kafka/featured')
  async getFeaturedProducts(): Promise<Product[]> {
    return this.kafkaService.send('get-featured-products', {}).toPromise();
  }
}
