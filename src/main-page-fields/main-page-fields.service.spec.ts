import { Test, TestingModule } from '@nestjs/testing';
import { MainPageFieldsService } from './main-page-fields.service';

describe('MainPageFieldsService', () => {
  let service: MainPageFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainPageFieldsService],
    }).compile();

    service = module.get<MainPageFieldsService>(MainPageFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
