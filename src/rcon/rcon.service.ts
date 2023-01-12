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
}
