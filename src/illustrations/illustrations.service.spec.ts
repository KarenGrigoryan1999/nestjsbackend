import { Test, TestingModule } from '@nestjs/testing';
import { IllustrationsService } from './illustrations.service';

describe('IllustrationsService', () => {
  let service: IllustrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IllustrationsService],
    }).compile();

    service = module.get<IllustrationsService>(IllustrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
