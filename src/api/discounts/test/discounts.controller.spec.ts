import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { DiscountsController } from '../discounts.controller';
import { DiscountsService } from '../discounts.service';
import * as process from 'process';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../../auth/auth.module';
import { DiscountsModule } from '../discounts.module';

describe('discounts controller test', () => {
  let moduleRef: TestingModuleBuilder,
    app: TestingModule,
    controller: DiscountsController;

  const discountMock = {
    _id: faker.database.mongodbObjectId(),
    value: faker.number.int({ max: 100 }),
    status: faker.datatype.boolean(0.9),
  };

  const discountServiceMock = {
    create: jest.fn(() => discountMock),
    findById: jest.fn(() => discountMock),
    findAll: jest.fn(() => [discountMock]),
    update: jest.fn(() => discountMock),
    delete: jest.fn(() => discountMock),
  };

  beforeAll(async () => {
    moduleRef = Test.createTestingModule({
      imports: [
        AuthModule,
        DiscountsModule,
        MongooseModule.forRoot(process.env.MONGO_URI),
      ],
    })
      .overrideProvider(DiscountsService)
      .useValue(discountServiceMock);

    app = await moduleRef.compile();
    controller = app.get(DiscountsController);
  });

  afterAll(async () => {
    if (app) {
      app.flushLogs();
      await app.close();
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(app).toBeDefined();
    expect(moduleRef).toBeDefined();
  });

  it('should find discount by id', async () => {
    const res = await controller.findById(discountMock._id);
    expect(res).toEqual(discountMock);
  });

  it('should find all discounts', async () => {
    const res = await controller.findAll();
    expect(res).toBeDefined();
    expect(res).toBeInstanceOf(Array);
  });
});
