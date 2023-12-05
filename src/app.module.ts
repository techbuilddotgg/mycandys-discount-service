import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as process from 'process';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountsModule } from './api/discounts/discounts.module';
import { OffersModule } from './api/offers/offers.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    }),
    DiscountsModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
