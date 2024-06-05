import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common';
import { HomeService } from '../services/home.service';
import { AddToFav } from '../models/addtofav.model';
import { Request } from 'express';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post('favorites')
  async addToFavorites(@Req() req: Request, @Body() body: { productId: string }): Promise<AddToFav> {
    const userId = req.user.userId; // Get userId from the request
    return this.homeService.addToFavorites(userId, body.productId);
  }

  @Get('products')
  async getProducts(@Query('category') category?: string, @Query('featured') featured?: string) {
    if (category) {
      return this.homeService.getProductsByCategory(category);
    } else if (featured) {
      return this.homeService.getFeaturedProducts();
    }
    return this.homeService.getAllProducts();
  }
}
