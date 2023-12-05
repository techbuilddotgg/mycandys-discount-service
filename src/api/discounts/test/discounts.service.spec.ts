import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { DiscountsService } from '../discounts.service';
import { DiscountRepository } from '../repository/discount.repository';
import { DiscountsModule } from '../discounts.module';
import { faker } from '@faker-js/faker';

describe('DiscountsService test', () => {
  let moduleRef: TestingModuleBuilder,
    discountsService: DiscountsService,
    app: TestingModule,
    discountRepository: DiscountRepository,
    discount: { type: string; value: number; status: boolean };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [DiscountsModule],
    });
    app = await moduleRef.compile();
    discountsService = app.get<DiscountsService>(DiscountsService);
    discountRepository = app.get<DiscountRepository>(DiscountRepository);
  });

  beforeEach(async () => {
    discount = {
      type: faker.commerce.productName(),
      value: faker.number.int({ max: 100 }),
      status: faker.datatype.boolean(0.9),
    };
  });

  afterAll(async () => {
    await discountRepository.dropCollection();
    if (app) {
      app.flushLogs();
      await app.close();
    }
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(moduleRef).toBeDefined();
    expect(discountRepository).toBeDefined();
    expect(discountsService).toBeDefined();
  });

  it('should create discount', async () => {
    const res = await discountsService.create(discount);
    expect(res).toBeDefined();
    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('createdAt');
    expect(res).toHaveProperty('updatedAt');
  });

  it('should find discount by id', async () => {
    const res = await discountsService.create(discount);
    const found = await discountsService.findById(res._id);
    expect(found).toBeDefined();
    expect(found).toHaveProperty('_id');
    expect(found).toHaveProperty('createdAt');
    expect(found).toHaveProperty('updatedAt');
  });

  it('should find all discounts', async () => {
    const res = await discountsService.create(discount);
    expect(res).toBeDefined();
    expect(res).toBeInstanceOf(Array);
  });

  it('should update discount', async () => {
    const res = await discountsService.create(discount);
    const updated = await discountsService.update(res._id, {
      type: faker.commerce.productName(),
      value: faker.number.int({ max: 100 }),
      status: faker.datatype.boolean(),
    });
    expect(updated).toBeDefined();
    expect(updated).toHaveProperty('_id');
    expect(updated.status).toEqual(false);
  });

  it('should delete discount', async () => {
    const res = await discountsService.create(discount);
    const deleted = await discountsService.delete(res._id);
    expect(deleted).toBeDefined();
    expect(deleted).toEqual(true);
  });
});
