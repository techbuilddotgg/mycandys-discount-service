import { PartialType } from '@nestjs/swagger';
import { CreateDiscountDto } from '../../discounts/dto/create-discount.dto';

export class CreateOfferDto extends PartialType(CreateDiscountDto) {}
