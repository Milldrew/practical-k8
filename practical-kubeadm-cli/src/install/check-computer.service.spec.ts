import { Test, TestingModule } from '@nestjs/testing';
import { CheckComputerService } from './check-computer.service';

describe('CheckComputerService', () => {
  let service: CheckComputerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckComputerService],
    }).compile();

    service = module.get<CheckComputerService>(CheckComputerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
