import { Test, TestingModule } from '@nestjs/testing';
import { IllustrationsController } from './illustrations.controller';
import { IllustrationsService } from './illustrations.service';

describe('IllustrationsController', () => {
  let controller: IllustrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IllustrationsController],
      providers: [IllustrationsService],
    }).compile();

    controller = module.get<IllustrationsController>(IllustrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
