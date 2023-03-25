import { Test, TestingModule } from '@nestjs/testing';
import { LearnStagesController } from './learn-stages.controller';

describe('LearnStagesController', () => {
  let controller: LearnStagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearnStagesController],
    }).compile();

    controller = module.get<LearnStagesController>(LearnStagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
