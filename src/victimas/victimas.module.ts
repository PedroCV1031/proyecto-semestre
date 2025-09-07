import {Module}from '@nestjs/common';
import {MongooseModule}from '@nestjs/mongoose';
import {VictimaService}from './victimas.service';
import {VictimaController}from './victimas.controller';
import {Victima,VictimaSchema}from './entities/victima.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Victima.name,schema:VictimaSchema}])],
  controllers:[VictimaController],
  providers:[VictimaService],
  exports:[VictimaService],
})
export class VictimasModule{}

