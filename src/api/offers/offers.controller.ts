import {
  Body,
  Controller,
  Post,
  HttpException,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { AuthGuard } from '../../auth/AuthGuard';
import { User } from '../../decorators/authorization.decorator';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @ApiOkResponse({ description: 'Create new offer' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createOffer(@Body() offerData: CreateOfferDto, @User() user: any) {
    try {
      return await this.offersService.createOffer(offerData, user);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @ApiOkResponse({ description: 'Remove offer' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put()
  async removeOffer(@Body() offerData: UpdateOfferDto, @User() user: any) {
    try {
      return await this.offersService.removeOffer(offerData, user);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
