import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDiscountDto } from '../../discounts/dto/create-discount.dto';
import { IsString } from 'class-validator';

export class CreateOfferDto extends PartialType(CreateDiscountDto) {
  @ApiProperty({ required: true })
  @IsString()
  id: string;
}
