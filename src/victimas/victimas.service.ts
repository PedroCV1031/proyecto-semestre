import {Injectable,NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Victima} from './entities/victima.entity';
import {CreateVictimaDto} from './dto/create-victima.dto';
import {UpdateVictimaDto} from './dto/update-victima.dto';

@Injectable()
export class VictimaService{
  constructor(@InjectModel(Victima.name) private readonly victimaModel:Model<Victima>){}

  async create(createVictimaDto:CreateVictimaDto){
    return this.victimaModel.create(createVictimaDto);
  }

  findAll(){
    return this.victimaModel.find({});
  }

  async findOne(id:number){
    const victima=await this.victimaModel.findOne({id});
    if(!victima){
      throw new NotFoundException('Víctima no encontrada');
    }
    return victima;
  }

  async update(id:number,updateVictimaDto:UpdateVictimaDto){
    const victima=await this.findOne(id);
    await this.victimaModel.updateOne({id},updateVictimaDto);
    return this.findOne(id);
  }

  async remove(id:number){
    const victima=await this.findOne(id);
    await this.victimaModel.deleteOne({id});
    return victima;
  }
}



