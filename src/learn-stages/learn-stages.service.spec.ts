import { Test, TestingModule } from '@nestjs/testing';
import { LearnStagesService } from './learn-stages.service';

describe('LearnStagesService', () => {
  let service: LearnStagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnStagesService],
    }).compile();

    service = module.get<LearnStagesService>(LearnStagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
