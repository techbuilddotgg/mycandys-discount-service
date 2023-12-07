import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountsModule } from '../discounts/discounts.module';
import { Discount, DiscountSchema } from '../discounts/schemas/discount.schema';
import { DiscountsService } from '../discounts/discounts.service';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discount.name, schema: DiscountSchema },
    ]),
    DiscountsModule,
    HttpModule,
  ],
  controllers: [OffersController],
  providers: [OffersService, DiscountsService],
  exports: [OffersService],
})
export class OffersModule {}
