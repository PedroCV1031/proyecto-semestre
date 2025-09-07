import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  // GET /leaderboard → Ranking de todos los Slaves
  @Get()
  findAll() {
    return this.leaderboardService.getLeaderboard();
  }

  // POST /leaderboard/recompensas/:slaveId → Asignar recompensa a un Slave
  @Post('recompensas/:slaveId')
  assignReward(
    @Param('slaveId') slaveId: string,
    @Body('reward') reward: string,
  ) {
    return this.leaderboardService.assignReward(+slaveId, reward);
  }
}
