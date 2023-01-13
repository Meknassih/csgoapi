import { Module } from '@nestjs/common';
import { FormatterService } from './formatter/formatter.service';
import { RconController } from './rcon.controller';
import { RconService } from './rcon.service';

@Module({
  controllers: [RconController],
  providers: [RconService, FormatterService]
})
export class RconModule { }
