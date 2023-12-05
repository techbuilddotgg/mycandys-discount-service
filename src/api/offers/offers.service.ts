import { Injectable } from '@nestjs/common';
import { DiscountsService } from '../discounts/discounts.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(private readonly discountsService: DiscountsService) {}

  async createOffer(data: CreateOfferDto) {
    const discount = await this.discountsService.create({
      type: data.type,
      value: data.value,
      status: data.status,
    });
    console.log(discount);

    //TODO call products service
    //call productsDiscount endpoint

    //TODO call notifications service
    //call sendEmail endpoint
  }

  async removeOffer(id: string) {
    const discount = await this.discountsService.update(id, {
      status: false,
    });
    console.log(discount);

    //TODO call products service
    //call productsRemoveDiscount endpoint
  }
}
