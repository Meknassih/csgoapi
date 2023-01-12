import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostBanDto } from './dto/ban.dto';
import { PostKickDto } from './dto/kick.dto';
import { PostMapDto } from './dto/map.dto';
import { PostSayDto } from './dto/say.dto';
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
    return this.rconService.kick(kickDto.name);
  }

  @Post("ban")
  postBan(@Body() banDto: PostBanDto): Promise<string> {
    return this.rconService.ban(banDto.userId, banDto.minutes);
  }

  @Post("say")
  postsay(@Body() sayDto: PostSayDto): Promise<string> {
    return this.rconService.say(sayDto.message);
  }
}
