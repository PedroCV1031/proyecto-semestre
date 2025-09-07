import {Module}from '@nestjs/common';
import {JwtModule}from '@nestjs/jwt';
import {PassportModule}from '@nestjs/passport';
import {MongooseModule}from '@nestjs/mongoose';
import {AuthService}from './auth.service';
import {AuthController}from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import {User,UserSchema}from '../users/entities/user.entity';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret:process.env.SECRET_KEY||'devsecret',
      signOptions:{expiresIn:'2h'}
    }),
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}])
  ],
  controllers:[AuthController],
  providers:[AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule{}

