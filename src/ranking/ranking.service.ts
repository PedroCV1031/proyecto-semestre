import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leaderboard } from './entities/ranking.entity';
import { User } from 'src/users/entities/user.entity';
import { Victima } from 'src/victimas/entities/victima.entity';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(Leaderboard.name) private readonly leaderboardModel: Model<Leaderboard>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Victima.name) private readonly victimaModel: Model<Victima>,
  ) {}

  async getLeaderboard() {
    const slaves = await this.userModel.find({ roles: 'slave' }).lean();
    
    const ranking: { name: string; total_capturas: number }[] = [];
    
    for (const slave of slaves) {
      // Contar directamente desde victimas (fuente de verdad)
      const victimasCount = await this.victimaModel.countDocuments({
        captured_by: slave._id
      });
      
      // Sincronizar o crear en leaderboards
      await this.leaderboardModel.findOneAndUpdate(
        { slave_id: slave._id },
        { 
          slave_id: slave._id,
          total_capturas: victimasCount 
        },
        { 
          upsert: true, // Crear si no existe
          new: true 
        }
      );
      
      ranking.push({
        name: slave.name,
        total_capturas: victimasCount,
      });
    }
    
    ranking.sort((a, b) => b.total_capturas - a.total_capturas);
    
    return ranking.map((item, index) => ({
      ranking: index + 1,
      name: item.name,
      total_capturas: item.total_capturas,
    }));
  }

  async assignReward(slaveId: string, reward: string) {
    const user = await this.userModel.findById(slaveId).exec();
    if (!user || user.roles !== 'slave') {
      throw new Error(`Usuario con id ${slaveId} no existe o no es un slave`);
    }

    let stats = await this.leaderboardModel.findOne({ slave_id: slaveId }).exec();
    if (!stats) {
      // Contar capturas reales y crear stats
      const realCount = await this.victimaModel.countDocuments({ captured_by: slaveId });
      stats = await this.leaderboardModel.create({
        slave_id: slaveId,
        total_capturas: realCount,
        recompensas: [],
      });
    }

    stats.recompensas.push(reward);
    await stats.save();
    return stats;
  }
}