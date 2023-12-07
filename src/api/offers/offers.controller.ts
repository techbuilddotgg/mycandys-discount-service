import { Body, Controller, Post, HttpException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @ApiOkResponse({ description: 'Create new offer' })
  @Post()
  async createOffer(@Body() offerData: CreateOfferDto) {
    try {
      return await this.offersService.createOffer(offerData);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @ApiOkResponse({ description: 'Remove offer' })
  @Post(':id')
  async removeOffer(@Param('id') id: UpdateOfferDto) {
    try {
      return await this.offersService.removeOffer(id);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
