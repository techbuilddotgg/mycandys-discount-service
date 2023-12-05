import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as process from 'process';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountsModule } from './api/discounts/discounts.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    }),
    DiscountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
