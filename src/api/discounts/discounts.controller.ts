import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { DiscountDocument } from './schemas/discount.schema';
import { AuthGuard } from '../../auth/AuthGuard';

@ApiTags('Discounts')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @ApiOkResponse({ description: 'Retrieves discount' })
  @ApiNotFoundResponse({ description: 'Discount not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<DiscountDocument> {
    try {
      return await this.discountsService.findById(id);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @ApiOkResponse({ description: 'Retrieves all discounts' })
  @ApiNotFoundResponse({ description: 'Discounts not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<DiscountDocument[]> {
    try {
      return await this.discountsService.findAll();
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @ApiOkResponse({ description: 'Create new discount' })
  @ApiPreconditionFailedResponse({ description: 'Discount already exists' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createDiscount(
    @Body() discount: CreateDiscountDto,
  ): Promise<DiscountDocument> {
    try {
      return await this.discountsService.create(discount);
    } catch (e) {
      throw new HttpException(e.message, 412);
    }
  }

  @ApiOkResponse({ description: 'Update discount' })
  @ApiNotFoundResponse({ description: 'Discount not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @Body() discount: UpdateDiscountDto,
    @Param('id') id: string,
  ): Promise<DiscountDocument> {
    try {
      return await this.discountsService.update(id, discount);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @ApiOkResponse({ description: 'Delete discount' })
  @ApiNotFoundResponse({ description: 'Discount not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.discountsService.delete(id);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
