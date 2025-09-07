import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaderboardController } from './ranking.controller';
import { LeaderboardService } from './ranking.service';
import { Leaderboard, LeaderboardSchema } from './entities/ranking.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Victima, VictimaSchema } from 'src/victimas/entities/victima.entity'; // <-- Importa Victima

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leaderboard.name, schema: LeaderboardSchema },
      { name: User.name, schema: UserSchema },
      { name: Victima.name, schema: VictimaSchema }, // <-- Agrega Victima aquí
    ]),
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
})
export class LeaderboardModule {}

