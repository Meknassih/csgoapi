import { Test, TestingModule } from '@nestjs/testing';
import { RconController } from './rcon.controller';

describe('RconController', () => {
  let controller: RconController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RconController],
    }).compile();

    controller = module.get<RconController>(RconController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
