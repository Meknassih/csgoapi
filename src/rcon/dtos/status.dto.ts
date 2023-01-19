export class GetStatusResponseDto {
  hostname: string;
  version: string;
  internalIp: string;
  ip: string;
  os: string;
  serverType: string;
  map: string;
  players: PlayersStatus
  isHibernating: boolean;
}

export class PlayersStatus {
  humans: number;
  bots: number;
}
