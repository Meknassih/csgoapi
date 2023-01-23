import { Injectable } from '@nestjs/common';
import { GetBotQuotaResponseDto } from '../dtos/botQuota.dto';
import { GetCheatsResponseDto } from '../dtos/cheats.dto';
import { GetHostnameResponseDto } from '../dtos/hostname.dto';
import { GetStatsResponseDto } from '../dtos/stats.dto';
import { GetStatusResponseDto } from '../dtos/status.dto';
import { UserResponseDto } from '../dtos/user.dto';

@Injectable()
export class FormatterService {
  formatUsers(users: string): UserResponseDto[] {
    const usersArray = users.split('\n');
    const usersResponse: UserResponseDto[] = [];
    usersArray.forEach((user) => {
      if (!user.match(/\d+:\d+:\"\w+\"/)) return;

      const userArray = user.split(':');
      const userResponse: UserResponseDto = {
        slot: parseFloat(userArray[0]),
        id: parseFloat(userArray[1]),
        username: JSON.parse(userArray[2]),
      };
      usersResponse.push(userResponse);
    });
    return usersResponse;
  }

  formatCheats(cheats: string): GetCheatsResponseDto {
    const cheatsResponse = {
      cheats: parseFloat(cheats.match(/"sv_cheats" = "(\d)"/)[1]),
    };
    return cheatsResponse;
  }

  formatHostname(hostname: string): GetHostnameResponseDto {
    const hostnameResponse = {
      hostname: hostname.match(/"hostname" = "([^"]*)"/)[1],
    };
    return hostnameResponse;
  }

  formatBotQuota(botQuota: string): GetBotQuotaResponseDto {
    const botQuotaResponse = {
      quota: parseFloat(botQuota.match(/"bot_quota" = "(\d+)"/)[1]),
    };
    return botQuotaResponse;
  }

  formatStatus(status: string): GetStatusResponseDto {
    const statusResponse = new GetStatusResponseDto();

    statusResponse.hostname = status.match(/hostname *:([^\n]+)/)[1].trim();
    statusResponse.version = status.match(/version *:([^\n]+)/)[1].trim();
    statusResponse.internalIp = status.match(/udp\/ip *:([^\n(]+)/)[1].trim();
    statusResponse.ip = status
      .match(/udp\/ip *:.*(\d+\.\d+\.\d+\.\d+)/)[1]
      .trim();
    statusResponse.os = status.match(/os *: *([^\n]+)/)[1].trim();
    statusResponse.serverType = status.match(/type *: *([^\n]+)/)[1].trim();
    statusResponse.map = status.match(/map *: *(\w+)/)[1].trim();
    statusResponse.players = {
      humans: parseFloat(status.match(/players *:.*(\d+) humans/)[1].trim()),
      bots: parseFloat(status.match(/players *:.*(\d+) bots/)[1].trim()),
    };
    statusResponse.isHibernating =
      status.match(/players *:.*\(hibernating\)/) !== null;

    return statusResponse;
  }

  formatStats(stats: string): GetStatsResponseDto {
    const statsResponse = new GetStatsResponseDto();

    const statsLine = stats.split('\n')[1].trim();
    const values = statsLine.match(/(\d+(\.\d+)?)/g);
    statsResponse.cpu = parseFloat(values[0]);
    statsResponse.netIn = parseFloat(values[1]);
    statsResponse.netOut = parseFloat(values[2]);
    statsResponse.uptime = parseInt(values[3]);
    statsResponse.maps = parseInt(values[4]);
    statsResponse.fps = parseInt(values[5]);
    statsResponse.players = parseInt(values[6]);
    statsResponse.svms = parseFloat(values[7]);
    statsResponse.jitterMs = parseFloat(values[8]);
    statsResponse.tick = parseFloat(values[9]);

    return statsResponse;
  }
}
