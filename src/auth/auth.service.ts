import {BadRequestException,Injectable,UnauthorizedException}from '@nestjs/common';
import {InjectModel}from '@nestjs/mongoose';
import {Model}from 'mongoose';
import * as bcrypt from 'bcrypt';
import {JwtService}from '@nestjs/jwt';
import {User}from '../users/entities/user.entity';
import {CreateAuthDto}from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

export interface JwtPayload{email:string;roles:string;}

@Injectable()
export class AuthService{
  constructor(@InjectModel(User.name)private readonly userModel:Model<User>,private readonly jwtService:JwtService){}

  async create(createAuthDto: CreateAuthDto) {
  try {
    const hash = bcrypt.hashSync(createAuthDto.password, 10);
    const user = new this.userModel({
      ...createAuthDto,
      password: hash,
      roles: createAuthDto.role // Use the role from DTO, not hardcoded array
    });
    return await user.save();
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}

  private getJwtToken(payload:JwtPayload){return this.jwtService.sign(payload);}

  async login(loginDto:LoginAuthDto){
    const{email,password}=loginDto;
    const user=await this.userModel.findOne({email});
    if(!user)throw new UnauthorizedException('Invalid credentials');
    const isValid=bcrypt.compareSync(password,user.password);
    if(!isValid)throw new UnauthorizedException('Invalid credentials');
    const jwtPayload:JwtPayload={email:user.email,roles:user.roles};
    const token=this.getJwtToken(jwtPayload);
    return {user,token};
  }
}

