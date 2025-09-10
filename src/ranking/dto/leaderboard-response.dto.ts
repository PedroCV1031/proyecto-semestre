import { ApiProperty } from '@nestjs/swagger';

export class LeaderboardItemDto {
  @ApiProperty({
    description: 'Posición en el ranking',
    example: 1
  })
  ranking: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez'
  })
  name: string;

  @ApiProperty({
    description: 'Total de capturas realizadas',
    example: 15
  })
  total_capturas: number;
}

export class LeaderboardResponseDto {
  @ApiProperty({
    description: 'Lista de usuarios ordenados por capturas',
    type: [LeaderboardItemDto]
  })
  data: LeaderboardItemDto[];
}