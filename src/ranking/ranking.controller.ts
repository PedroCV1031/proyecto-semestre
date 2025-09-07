import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { LeaderboardService } from './ranking.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  findAll() {
    return this.leaderboardService.getLeaderboard();
  }

  @Post('recompensas/:slaveId')
  assignReward(
    @Param('slaveId') slaveId: string,
    @Body('reward') reward: string,
  ) {
    return this.leaderboardService.assignReward(slaveId, reward);
  }
}
