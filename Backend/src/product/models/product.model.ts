import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop() name: string;
  @Prop() price: number;
  @Prop() category: string;
  @Prop() featured: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
