import { Injectable } from '@nestjs/common';
import { DiscountsService } from '../discounts/discounts.service';

@Injectable()
export class OffersService {
  constructor(private readonly discountsService: DiscountsService) {}
}
