import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dto/user.dto';

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

  formatCheats(cheats: string): { cheats: number } {
    const cheatsResponse = {
      cheats: parseInt(cheats.match(/"sv_cheats" = "(\d)"/)[1], 10)
    };
    return cheatsResponse;
  }
}
