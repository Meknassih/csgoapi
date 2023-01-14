import { Injectable } from '@nestjs/common';
import { GetBotQuotaResponseDto } from '../dtos/botQuota.dto';
import { GetCheatsResponseDto } from '../dtos/cheats.dto';
import { GetHostnameResponseDto } from '../dtos/hostname.dto';
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
        slot: parseInt(userArray[0], 10),
        id: parseInt(userArray[1], 10),
        username: JSON.parse(userArray[2])
      };
      usersResponse.push(userResponse);
    });
    return usersResponse;
  }

  formatCheats(cheats: string): GetCheatsResponseDto {
    const cheatsResponse = {
      cheats: parseInt(cheats.match(/"sv_cheats" = "(\d)"/)[1], 10)
    };
    return cheatsResponse;
  }

  formatHostname(hostname: string): GetHostnameResponseDto {
    const hostnameResponse = {
      hostname: hostname.match(/"hostname" = "([^"]*)"/)[1]
    };
    return hostnameResponse;
  }

  formatBotQuota(botQuota: string): GetBotQuotaResponseDto {
    const botQuotaResponse = {
      quota: parseInt(botQuota.match(/"bot_quota" = "(\d+)"/)[1], 10)
    };
    return botQuotaResponse;
  }
}
