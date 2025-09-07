import {Module}from '@nestjs/common';
import {MongooseModule}from '@nestjs/mongoose';
import {VictimasService}from './victimas.service';
import {VictimasController}from './victimas.controller';
import {Victima,VictimaSchema}from './entities/victima.entity';
import {Leaderboard,LeaderboardSchema}from '../ranking/entities/ranking.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Victima.name,schema:VictimaSchema},
      {name:Leaderboard.name,schema:LeaderboardSchema} // <-- IMPORTANTE
    ])
  ],
  controllers:[VictimasController],
  providers:[VictimasService],
  exports:[VictimasService]
})
export class VictimasModule{}

