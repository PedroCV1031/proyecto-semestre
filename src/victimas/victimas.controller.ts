import {Controller,Get,Post,Body,Patch,Param,Delete} from '@nestjs/common';
import {VictimaService} from './victimas.service';
import {CreateVictimaDto}from './dto/create-victima.dto';
import {UpdateVictimaDto}from './dto/update-victima.dto';

@Controller('victimas')
export class VictimaController{
  constructor(private readonly victimaService:VictimaService){}

  @Post()
  create(@Body()createVictimaDto:CreateVictimaDto){
    return this.victimaService.create(createVictimaDto);
  }

  @Get()
  findAll(){
    return this.victimaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id')id:string){
    return this.victimaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id')id:string,@Body()updateVictimaDto:UpdateVictimaDto){
    return this.victimaService.update(+id,updateVictimaDto);
  }

  @Delete(':id')
  remove(@Param('id')id:string){
    return this.victimaService.remove(+id);
  }
}


