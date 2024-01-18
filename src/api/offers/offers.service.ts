import { Injectable } from '@nestjs/common';
import { DiscountsService } from '../discounts/discounts.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import * as process from 'process';
import { HttpService } from '@nestjs/axios';
import type { AxiosError } from 'axios';
import { emailSubject } from '../../utils/emailContext';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    private readonly discountsService: DiscountsService,
    private readonly httpService: HttpService,
  ) {}
  async createOffer(data: CreateOfferDto, user: any) {
    const notificationsMicroservice = process.env.NOTIFICATION_SERVICE;
    const productsMicroservice = process.env.PRODUCTS_SERVICE;

    const mailingList = await this.getMailingList(user);

    await this.discountsService
      .create({
        type: data.type,
        value: data.value,
        status: data.status,
      })
      .then(async (res) => {
        const { data: productsServiceRes } =
          await this.httpService.axiosRef.put(
            `${productsMicroservice}/products/${data.id}/discount`,
            {
              temporaryPrice: res.value,
              discountId: res._id.toString(),
            },
            {
              headers: {
                Authorization: user,
              },
            },
          );

        if (!productsServiceRes) {
          throw new Error('Error while applying the discount on products');
        }

        await this.httpService.axiosRef.post(
          `${notificationsMicroservice}/emails`,
          {
            title: 'New special offer TEST',
            message: 'Check out this cool new MyCandys offer we have for you!',
            type: emailSubject(res.type),
            users: mailingList,
          },
          {
            headers: {
              Authorization: user,
            },
          },
        );
      })
      .catch((e) => {
        const err = e as AxiosError;
        console.log(err.request);
      });
  }

  async removeOffer(data: UpdateOfferDto, user: any) {
    const productsMicroservice = process.env.PRODUCTS_SERVICE;

    await this.discountsService.update(data.discountId, {
      status: false,
    });

    const { data: productsServiceRes } = await this.httpService.axiosRef.put(
      `${productsMicroservice}/products/${data.id}/discount`,
      {
        temporaryPrice: -1,
        discountId: '',
      },
      {
        headers: {
          Authorization: user,
        },
      },
    );

    if (!productsServiceRes) {
      throw new Error('Error while removing the discount on products');
    }
    return 'Offer removed successfully!';
  }

  async getMailingList(user: string) {
    const usersMicroservice = process.env.AUTH_SERVICE;

    const { data: usersServiceRes } = await this.httpService.axiosRef.get(
      `${usersMicroservice}/users/emails`,
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      },
    );
    if (!usersServiceRes) {
      throw new Error('Error while fetching users');
    }
    return usersServiceRes.emails;
  }
}
