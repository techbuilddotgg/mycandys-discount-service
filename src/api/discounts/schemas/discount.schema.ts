import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'discounts' })
export class Discount {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Number, required: true })
  value: number;

  @Prop({ type: Boolean, required: true })
  status: boolean;

  // @Prop({ type: Date, required: false })
  // startDate: Date;
  //
  // @Prop({ type: Date, required: false })
  // endDate: Date;

  @Prop({ type: Date, required: false })
  createdAt: Date;

  @Prop({ type: Date, required: false })
  updatedAt: Date;
}

export type DiscountDocument = Discount & Document;
export const DiscountSchema = SchemaFactory.createForClass(Discount);
