import {Module}from '@nestjs/common';
import {MongooseModule}from '@nestjs/mongoose';
import {ConfigModule}from '@nestjs/config';
import {AppController}from './app.controller';
import {AppService}from './app.service';
import {AuthModule}from './auth/auth.module';
import {UsersModule}from './users/users.module';
import {VictimasModule}from './victimas/victimas.module';
import { LeaderboardModule } from './ranking/ranking.module';


@Module({
  imports:[
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.DATABASE_URL??''),
    AuthModule,
    UsersModule,
    VictimasModule,
    LeaderboardModule
  ],
  controllers:[AppController],
  providers:[AppService],
})
export class AppModule{}



