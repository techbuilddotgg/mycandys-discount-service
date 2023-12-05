import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Discount, DiscountDocument } from '../schemas/discount.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateDiscountDto } from '../dto/create-discount.dto';

@Injectable()
export class DiscountRepository {
  constructor(
    @InjectModel(Discount.name)
    private readonly discountModel: Model<DiscountDocument>,
  ) {}

  async create(discount: CreateDiscountDto): Promise<DiscountDocument> {
    const entity = new this.discountModel(discount);
    return entity.save();
  }
  async findById(id: string): Promise<DiscountDocument> {
    return this.discountModel.findById(id);
  }

  async findAll(): Promise<DiscountDocument[]> {
    return this.discountModel.find();
  }

  async findOneAndUpdate(
    discountFilterQuery: FilterQuery<DiscountDocument>,
    discount: UpdateQuery<DiscountDocument>,
  ): Promise<DiscountDocument> {
    return this.discountModel.findOneAndUpdate(discountFilterQuery, discount, {
      new: true,
    });
  }

  async findOneAndDelete(discountFilterQuery: FilterQuery<DiscountDocument>) {
    return this.discountModel.findOneAndDelete(discountFilterQuery);
  }
}
