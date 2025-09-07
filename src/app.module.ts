import {Module}from '@nestjs/common';
import {AppController}from './app.controller';
import {AppService}from './app.service';
import {VictimasModule}from './victimas/victimas.module';
import {MongooseModule}from '@nestjs/mongoose';
import {ConfigModule}from '@nestjs/config';


@Module({
  imports:[
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.DATABASE_URL??""),
    VictimasModule,
  ],
  controllers:[AppController],
  providers:[AppService],
})
export class AppModule{}


