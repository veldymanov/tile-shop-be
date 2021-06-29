import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from 'src/order';
import { CartController } from './cart.controller';
import { CartService } from './services';

describe('CartController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        { provide: CartService, useValue: {} },
        { provide: OrderService, useValue: {} },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
