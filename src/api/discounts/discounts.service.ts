import { Injectable, NotFoundException } from '@nestjs/common';
import { DiscountRepository } from './repository/discount.repository';
import { DiscountDocument } from './schemas/discount.schema';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class DiscountsService {
  constructor(private readonly discountRepository: DiscountRepository) {}

  async findById(id: string): Promise<DiscountDocument> {
    const discount = await this.discountRepository.findById(id);
    if (!discount) {
      throw new NotFoundException('Discount not found');
    }
    return discount;
  }

  async create(data: CreateDiscountDto): Promise<DiscountDocument> {
    return await this.discountRepository.create(data);
  }

  async findAll(): Promise<DiscountDocument[]> {
    return await this.discountRepository.findAll();
  }

  async update(
    discountId: string,
    discount: UpdateDiscountDto,
  ): Promise<DiscountDocument> {
    return await this.discountRepository.findOneAndUpdate(
      { id: discountId },
      discount,
    );
  }

  async delete(discountId: string): Promise<boolean> {
    const deletedDiscount = await this.discountRepository.findOneAndDelete({
      id: discountId,
    });

    if (!deletedDiscount) {
      throw new NotFoundException('Discount not found');
    }

    return !!deletedDiscount;
  }
}
