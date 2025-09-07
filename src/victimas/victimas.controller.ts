import {Controller,Get,Post,Body,Patch,Param,Delete}from '@nestjs/common';
import { VictimasService } from './victimas.service';
import {CreateVictimaDto}from './dto/create-victima.dto';
import {UpdateVictimaDto}from './dto/update-victima.dto';

@Controller('victimas')
export class VictimasController{
  constructor(private readonly victimasService:VictimasService){}

  @Post()
  create(@Body()createVictimaDto:CreateVictimaDto){
    return this.victimasService.create(createVictimaDto);
  }

  @Get()
  findAll(){
    return this.victimasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id')id:string){
    return this.victimasService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id')id:string,@Body()dto:UpdateVictimaDto){
    return this.victimasService.updateById(id,dto);
  }

  @Delete(':id')
  remove(@Param('id')id:string){
    return this.victimasService.removeById(id);
  }
}



