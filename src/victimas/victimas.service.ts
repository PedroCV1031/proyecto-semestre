import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Victima } from './entities/victima.entity';
import { CreateVictimaDto } from './dto/create-victima.dto';
import { UpdateVictimaDto } from './dto/update-victima.dto';
import { Leaderboard } from '../ranking/entities/ranking.entity';

@Injectable()
export class VictimasService {
  constructor(
    @InjectModel(Victima.name) private readonly victimaModel: Model<Victima>,
    @InjectModel(Leaderboard.name) private readonly leaderboardModel: Model<Leaderboard>,
  ) {}

  async create(dto: CreateVictimaDto, capturedBy:string) {
    // Asegurar que captured_by se guarde como ObjectId
    const victim = await this.victimaModel.create({
      ...dto,
      captured_by: new Types.ObjectId(capturedBy),
    });

    // Inicializar stats en leaderboard si no existen
    let stats = await this.leaderboardModel.findOne({ slave_id: capturedBy });
    if (!stats) {
      stats = await this.leaderboardModel.create({
        slave_id: capturedBy,
        total_capturas: 0,
        recompensas: [],
      });
    }

    // Incrementar capturas en leaderboard
    await this.leaderboardModel.updateOne(
      { slave_id: capturedBy },
      { $inc: { total_capturas: 1 } },
    );

    return victim;
  }

  findAll() {
    return this.victimaModel.find({});
  }

  async findOneById(id: string) {
    const victim = await this.victimaModel.findById(id);
    if (!victim) throw new NotFoundException('Victima no encontrada');
    return victim;
  }

  async updateById(id: string, dto: UpdateVictimaDto) {
    await this.victimaModel.updateOne({ _id: id }, dto);
    return this.findOneById(id);
  }

  async removeById(id: string) {
    const victim = await this.findOneById(id);
    await this.victimaModel.deleteOne({ _id: id });
    return victim;
  }
}




