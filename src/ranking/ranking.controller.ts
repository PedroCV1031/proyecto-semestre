import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './ranking.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Leaderboard } from './entities/ranking.entity';
import { LeaderboardItemDto } from './dto/leaderboard-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('leaderboard')
@Controller('leaderboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Roles(Role.MASTER, Role.DEVELOPER, Role.SLAVE)
  @ApiOperation({ 
    summary: 'Obtener ranking de usuarios',
    description: 'Retorna el ranking de usuarios ordenado por número de capturas (MASTER, DEVELOPER, SLAVE)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Ranking obtenido exitosamente',
    type: [LeaderboardItemDto]
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol MASTER, DEVELOPER o SLAVE' 
  })
  @Get()
  findAll() {
    return this.leaderboardService.getLeaderboard();
  }

  @Roles(Role.MASTER, Role.DEVELOPER)
  @ApiOperation({ 
    summary: 'Asignar recompensa a usuario',
    description: 'Asigna una recompensa a un usuario específico (Solo MASTER y DEVELOPER)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Recompensa asignada exitosamente',
    type: Leaderboard
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Usuario no existe o no es un slave' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol MASTER o DEVELOPER' 
  })
  @ApiParam({ 
    name: 'slaveId', 
    description: 'ID del usuario esclavo', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        reward: { 
          type: 'string', 
          example: 'Primera captura',
          description: 'Nombre de la recompensa a asignar'
        }
      },
      required: ['reward']
    }
  })
  @Post('recompensas/:slaveId')
  assignReward(
    @Param('slaveId') slaveId: string,
    @Body('reward') reward: string,
  ) {
    return this.leaderboardService.assignReward(slaveId, reward);
  }
}
