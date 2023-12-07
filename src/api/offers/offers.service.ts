import { Injectable } from '@nestjs/common';
import { DiscountsService } from '../discounts/discounts.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import * as process from 'process';
import { HttpService } from '@nestjs/axios';
import type { AxiosError } from 'axios';
import { emailSubject, mailingList } from '../../utils/emailContext';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    private readonly discountsService: DiscountsService,
    private readonly httpService: HttpService,
  ) {}

  async createOffer(data: CreateOfferDto) {
    const notificationsMicroservice = process.env.NOTIFICATION_SERVICE;
    const productsMicroservice = process.env.PRODUCTS_SERVICE;

    await this.discountsService
      .create({
        type: data.type,
        value: data.value,
        status: data.status,
      })
      .then(async (res) => {
        const { data: productsServiceRes } =
          await this.httpService.axiosRef.post(
            `${productsMicroservice}/${data.id}/discount`,
            {
              temporaryPrice: res.value,
            },
          );
        if (!productsServiceRes) {
          throw new Error('Error while applying the discount on products');
        }

        for (const email of mailingList()) {
          const { data: mailServiceRes } = await this.httpService.axiosRef.post(
            `${notificationsMicroservice}/emails`,
            {
              user: email,
              title: 'New special offer',
              message:
                'Check out this cool new MyCandys offer we have for you!',
              type: emailSubject(res.type),
            },
          );
          if (!mailServiceRes) {
            throw new Error('Error while sending email');
          }
        }
      })
      .catch((e) => {
        const err = e as AxiosError;
        console.log(err.request);
      });
    return 'Offer created successfully!';
  }

  async removeOffer(data: UpdateOfferDto) {
    const productsMicroservice = process.env.PRODUCTS_SERVICE;

    // const discount = await this.discountsService.update(id, {
    //   status: false,
    // });

    const { data: productsServiceRes } = await this.httpService.axiosRef.post(
      `${productsMicroservice}/${data.id}/discount`,
      {
        temporaryPrice: -1,
      },
    );

    if (!productsServiceRes) {
      throw new Error('Error while removing the discount on products');
    }

    return 'Offer removed successfully!';
  }
}
