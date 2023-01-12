import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Rcon from 'rcon-srcds';

@Injectable()
export class RconService {
  private server: Rcon;

  constructor(private readonly configService: ConfigService) {
    this.server = new Rcon({
      host: configService.get('CSGO_SERVER_HOST'),
      port: configService.get('CSGO_SERVER_PORT')
    });
    this.server.authenticate(configService.get('CSGO_RCON_PASSWORD'));
  }

  async status(): Promise<string> {
    return this.server.execute('status') as Promise<string>;
  }

  async users(): Promise<string> {
    return this.server.execute('users') as Promise<string>;
  }

  async map(name: string): Promise<string> {
    return this.server.execute(`map ${name}`) as Promise<string>;
  }

  async kick(name: string): Promise<string> {
    return this.server.execute(`kick ${name}`) as Promise<string>;
  }

  async ban(userId: string, minutes: number): Promise<string> {
    return this.server.execute(`ban ${minutes} ${userId}`) as Promise<string>;
  }

  async say(message: string): Promise<string> {
    return this.server.execute(`say ${message}`) as Promise<string>;
  }

  async restartGame(seconds: number): Promise<string> {
    return this.server.execute(`mp_restartgame ${seconds}`) as Promise<string>;
  }

  async setPassword(password: 0 | string): Promise<string> {
    return this.server.execute(`sv_password ${password}`) as Promise<string>;
  }

  async setHostname(hostname: string): Promise<string> {
    return this.server.execute(`hostname ${hostname}`) as Promise<string>;
  }

  async exec(filename: string): Promise<string> {
    return this.server.execute(`exec ${filename}`) as Promise<string>;
  }

  async botQuota(quota: number): Promise<string> {
    return this.server.execute(`bot_quota ${quota}`) as Promise<string>;
  }

  async makeVip(username: string): Promise<string> {
    return this.server.execute(`cs_make_vip ${username}`) as Promise<string>;
  }

  async cheats(enable: boolean): Promise<string> {
    return this.server.execute(`sv_cheats ${enable ? 1 : 0}`) as Promise<string>;
  }

  async stats(): Promise<string> {
    return this.server.execute(`stats`) as Promise<string>;
  }

  async listid(): Promise<string> {
    return this.server.execute(`listid`) as Promise<string>;
  }

  async cvarlist(): Promise<string> {
    return this.server.execute(`cvarlist`) as Promise<string>;
  }

  async explode(username: string): Promise<string> {
    return this.server.execute(`explode ${username}`) as Promise<string>;
  }
}
