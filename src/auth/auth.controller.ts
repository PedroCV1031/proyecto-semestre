import {Controller,Post,Body}from '@nestjs/common';
import {AuthService}from './auth.service';
import {CreateAuthDto}from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController{
  constructor(private readonly authService:AuthService){}

  @Post('register')
  create(@Body()dto:CreateAuthDto){
    return this.authService.create(dto);
  }

  @Post('login')
  login(@Body()dto:LoginAuthDto){
    return this.authService.login(dto);
  }
}
