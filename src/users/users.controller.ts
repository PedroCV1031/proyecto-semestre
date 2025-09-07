import {Controller,Get,Patch,Delete,Param,Body}from '@nestjs/common';
import {UsersService}from './users.service';
import {UpdateUserDto}from './dto/update-user.dto';

@Controller('users')
export class UsersController{
  constructor(private readonly usersService:UsersService){}

  @Get()
  findAll(){return this.usersService.findAll();}

  @Get(':id')
  findOne(@Param('id')id:string){return this.usersService.findOne(id);}

  @Patch(':id')
  update(@Param('id')id:string,@Body()dto:UpdateUserDto){return this.usersService.update(id,dto);}

  @Delete(':id')
  remove(@Param('id')id:string){return this.usersService.remove(id);}
}

