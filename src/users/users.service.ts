import {Injectable,NotFoundException}from '@nestjs/common';
import {InjectModel}from '@nestjs/mongoose';
import {Model}from 'mongoose';
import {User}from './entities/user.entity';
import {UpdateUserDto}from './dto/update-user.dto';

@Injectable()
export class UsersService{
  constructor(@InjectModel(User.name)private readonly userModel:Model<User>){}

  async findAll(){return this.userModel.find();}

  async findOne(id:string){
    const user=await this.userModel.findById(id);
    if(!user)throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email:string){return this.userModel.findOne({email});}

  async update(id:string,dto:UpdateUserDto){
    const user=await this.findOne(id);
    await this.userModel.updateOne({_id:id},dto);
    return this.findOne(id);
  }

  async remove(id:string){
    const user=await this.findOne(id);
    await this.userModel.deleteOne({_id:id});
    return user;
  }
}

