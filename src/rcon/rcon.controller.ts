import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostBanDto } from './dto/ban.dto';
import { PostBotQuotaDto } from './dto/botQuota.dto';
import { PostCheatsDto } from './dto/cheats.dto';
import { PostExecuteDto } from './dto/execute.dto';
import { PostExplodeDto } from './dto/explode.dto';
import { PostHostnameDto } from './dto/hostname.dto';
import { PostKickDto } from './dto/kick.dto';
import { PostMapDto } from './dto/map.dto';
import { PostPasswordDto } from './dto/password.dto';
import { PostRestartDto } from './dto/restart.dto';
import { PostSayDto } from './dto/say.dto';
import { PostVipDto } from './dto/vip.dto';
import { RconService } from './rcon.service';

@Controller('rcon')
export class RconController {
  constructor(private readonly rconService: RconService) { }

  @Get("status")
  getStatus(): Promise<string> {
    return this.rconService.status();
  }

  @Get("users")
  getUsers(): Promise<string> {
    return this.rconService.users();
  }

  @Post("map")
  postMap(@Body() mapDto: PostMapDto): Promise<string> {
    return this.rconService.map(mapDto.name);
  }

  @Post("kick")
  postKick(@Body() kickDto: PostKickDto): Promise<string> {
    return this.rconService.kick(kickDto.username);
  }

  @Post("ban")
  postBan(@Body() banDto: PostBanDto): Promise<string> {
    return this.rconService.ban(banDto.userId, banDto.minutes);
  }

  @Post("say")
  postSay(@Body() sayDto: PostSayDto): Promise<string> {
    return this.rconService.say(sayDto.message);
  }

  @Post("restart")
  postRestart(@Body() restartDto: PostRestartDto): Promise<string> {
    return this.rconService.restartGame(restartDto.seconds);
  }

  @Post("password")
  postPassword(@Body() passwordDto: PostPasswordDto): Promise<string> {
    return this.rconService.setPassword(passwordDto.password);
  }

  @Post("hostname")
  postHostname(@Body() hostnameDto: PostHostnameDto): Promise<string> {
    return this.rconService.setHostname(hostnameDto.hostname);
  }

  @Post("execute")
  postExecute(@Body() executeDto: PostExecuteDto): Promise<string> {
    return this.rconService.exec(executeDto.filename);
  }

  @Post("botQuota")
  postBotQuota(@Body() botQuotaDto: PostBotQuotaDto): Promise<string> {
    return this.rconService.botQuota(botQuotaDto.quota);
  }

  @Post("vip")
  postVip(@Body() vipDto: PostVipDto): Promise<string> {
    return this.rconService.makeVip(vipDto.username);
  }

  @Post("cheats")
  postCheats(@Body() cheatsDto: PostCheatsDto): Promise<string> {
    return this.rconService.cheats(cheatsDto.enable);
  }

  @Get("stats")
  getStats(): Promise<string> {
    return this.rconService.stats();
  }

  @Get("listid")
  getListid(): Promise<string> {
    return this.rconService.listid();
  }

  @Get("cvarlist")
  getCvarlist(): Promise<string> {
    return this.rconService.cvarlist();
  }

  @Post("explode")
  postExplode(@Body() explodeDto: PostExplodeDto): Promise<string> {
    return this.rconService.explode(explodeDto.username);
  }
}
