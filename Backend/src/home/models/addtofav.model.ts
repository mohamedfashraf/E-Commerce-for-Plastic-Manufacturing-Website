import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class AddToFav extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' }) userId: Types.ObjectId;
  @Prop([{ type: Types.ObjectId, ref: 'Product' }]) products: Types.ObjectId[];
}

export const AddToFavSchema = SchemaFactory.createForClass(AddToFav);
