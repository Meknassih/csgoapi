import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseFilters,
} from '@nestjs/common';
import { PostBanDto } from './dtos/ban.dto';
import { GetBotQuotaResponseDto, PostBotQuotaDto } from './dtos/botQuota.dto';
import { GetCheatsResponseDto, PostCheatsDto } from './dtos/cheats.dto';
import { PostExecuteDto } from './dtos/execute.dto';
import { PostExplodeDto } from './dtos/explode.dto';
import { GetHostnameResponseDto, PostHostnameDto } from './dtos/hostname.dto';
import { PostKickDto } from './dtos/kick.dto';
import { PostMapDto } from './dtos/map.dto';
import { PostPasswordDto } from './dtos/password.dto';
import { PostRestartDto } from './dtos/restart.dto';
import { PostSayDto } from './dtos/say.dto';
import { GetStatsResponseDto } from './dtos/stats.dto';
import { GetStatusResponseDto } from './dtos/status.dto';
import { UserResponseDto } from './dtos/user.dto';
import { PostVipDto } from './dtos/vip.dto';
import { RconExceptionFilter } from './filters/rcon-exception.filter';
import { FormatterService } from './formatter/formatter.service';
import { RconService } from './rcon.service';

@Controller('rcon')
@UseFilters(RconExceptionFilter)
export class RconController {
  private readonly logger = new Logger(RconController.name);

  constructor(
    private readonly rconService: RconService,
    private readonly formatterService: FormatterService,
  ) {}

  @Get('status')
  async getStatus(): Promise<GetStatusResponseDto> {
    try {
      const data = await this.rconService.status();
      return this.formatterService.formatStatus(data);
    } catch (error) {
      this.logger.error(error);
      this.rconService.initialize();
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Get('users')
  async getUsers(): Promise<UserResponseDto[]> {
    try {
      const data = await this.rconService.users();
      return this.formatterService.formatUsers(data);
    } catch (error) {
      this.logger.error(error);
      this.rconService.initialize();
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Post('map')
  postMap(@Body() mapDto: PostMapDto): Promise<string> {
    return this.rconService.map(mapDto.name);
  }

  @Post('kick')
  postKick(@Body() kickDto: PostKickDto): Promise<string> {
    return this.rconService.kick(kickDto.username);
  }

  @Post('ban')
  postBan(@Body() banDto: PostBanDto): Promise<string> {
    return this.rconService.ban(banDto.userId, banDto.minutes);
  }

  @Post('say')
  postSay(@Body() sayDto: PostSayDto): Promise<string> {
    return this.rconService.say(sayDto.message);
  }

  @Post('restart')
  postRestart(@Body() restartDto: PostRestartDto): Promise<string> {
    return this.rconService.restartGame(restartDto.seconds);
  }

  @Post('password')
  postPassword(@Body() passwordDto: PostPasswordDto): Promise<string> {
    return this.rconService.setPassword(passwordDto.password);
  }

  @Get('hostname')
  async getHostname(): Promise<GetHostnameResponseDto> {
    try {
      const response = await this.rconService.hostname();
      return this.formatterService.formatHostname(response);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Post('hostname')
  postHostname(@Body() hostnameDto: PostHostnameDto): Promise<string> {
    return this.rconService.hostname(hostnameDto.hostname);
  }

  @Post('execute')
  postExecute(@Body() executeDto: PostExecuteDto): Promise<string> {
    return this.rconService.exec(executeDto.filename);
  }

  @Get('botQuota')
  async getBotQuota(): Promise<GetBotQuotaResponseDto> {
    try {
      const response = await this.rconService.botQuota();
      return this.formatterService.formatBotQuota(response);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Post('botQuota')
  async postBotQuota(@Body() botQuotaDto: PostBotQuotaDto): Promise<void> {
    await this.rconService.botQuota(botQuotaDto.quota);
    return;
  }

  @Post('vip')
  postVip(@Body() vipDto: PostVipDto): Promise<string> {
    return this.rconService.makeVip(vipDto.username);
  }

  @Get('cheats')
  async getCheats(): Promise<GetCheatsResponseDto | Error> {
    try {
      const response = await this.rconService.cheats();
      return this.formatterService.formatCheats(response);
    } catch (error) {
      this.logger.error(error);
      this.rconService.initialize();
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Post('cheats')
  postCheats(@Body() cheatsDto: PostCheatsDto): Promise<string> {
    return this.rconService.cheats(cheatsDto.enable);
  }

  @Get('stats')
  async getStats(): Promise<GetStatsResponseDto> {
    try {
      const response = await this.rconService.stats();
      return this.formatterService.formatStats(response);
    } catch (error) {
      this.logger.error(error);
      this.rconService.initialize();
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Get('listid')
  getListid(): Promise<string> {
    return this.rconService.listid();
  }

  @Get('cvarlist')
  getCvarlist(): Promise<string> {
    return this.rconService.cvarlist();
  }

  @Post('explode')
  postExplode(@Body() explodeDto: PostExplodeDto): Promise<string> {
    return this.rconService.explode(explodeDto.username);
  }
}
