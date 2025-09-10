import {Injectable,UnauthorizedException}from '@nestjs/common';
import {PassportStrategy}from '@nestjs/passport';
import {ExtractJwt,Strategy}from 'passport-jwt';
import {InjectModel}from '@nestjs/mongoose';
import {Model}from 'mongoose';
import {User}from '../users/entities/user.entity';
import {JwtPayload}from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(@InjectModel(User.name)private readonly userModel:Model<User>){
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:process.env.SECRET_KEY||'devsecret',
      ignoreExpiration:false
    });
  }
  async validate(payload:JwtPayload){
    const user=await this.userModel.findOne({email:payload.email});
    if(!user)throw new UnauthorizedException('User not found');
    
    // Return user object with roles for role-based access control
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles
    };
  }
}
