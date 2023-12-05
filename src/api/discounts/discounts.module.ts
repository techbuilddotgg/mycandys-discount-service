import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { Discount, DiscountSchema } from './schemas/discount.schema';
import { DiscountRepository } from './repository/discount.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discount.name, schema: DiscountSchema },
    ]),
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService, DiscountRepository],
  exports: [DiscountsService, DiscountRepository],
})
export class NotificationsModule {}
