import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leaderboard } from './entities/leaderboard.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(Leaderboard.name)
    private readonly leaderboardModel: Model<Leaderboard>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  // GET /leaderboard → ranking de slaves
  async getLeaderboard() {
    return this.leaderboardModel
      .find()
      .populate('slave_id', 'username email') // traer datos básicos del usuario
      .sort({ total_capturas: -1 }) // ordenar por más capturas
      .exec();
  }

  // POST /leaderboard/recompensas/:slaveId → asignar recompensa
  async assignReward(slaveId: string, reward: string) {
    const slaveStats = await this.leaderboardModel
      .findOne({ slave_id: slaveId })
      .exec();

    if (!slaveStats) {
      throw new NotFoundException(`No se encontraron estadísticas para el slave ${slaveId}`);
    }

    slaveStats.recompensas.push(reward);
    await slaveStats.save();

    return slaveStats;
  }

  // Extra: inicializar stats si no existe
  async ensureStatsForSlave(slaveId: string) {
    let stats = await this.leaderboardModel.findOne({ slave_id: slaveId });
    if (!stats) {
      stats = await this.leaderboardModel.create({
        slave_id: slaveId,
        total_capturas: 0,
        recompensas: [],
      });
    }
    return stats;
  }
}
