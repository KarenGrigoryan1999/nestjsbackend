import { Test, TestingModule } from '@nestjs/testing';
import { MainPageFieldsController } from './main-page-fields.controller';

describe('MainPageFieldsController', () => {
  let controller: MainPageFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainPageFieldsController],
    }).compile();

    controller = module.get<MainPageFieldsController>(MainPageFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
