import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountsModule } from '../discounts/discounts.module';
import { Discount, DiscountSchema } from '../discounts/schemas/discount.schema';
import { DiscountsService } from '../discounts/discounts.service';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discount.name, schema: DiscountSchema },
    ]),
    DiscountsModule,
  ],
  controllers: [OffersController],
  providers: [OffersService, DiscountsService],
  exports: [OffersService],
})
export class OffersModule {}
