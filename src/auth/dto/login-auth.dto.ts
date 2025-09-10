import {IsEmail,IsString,MinLength}from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto{
  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@ejemplo.com',
    format: 'email'
  })
  @IsEmail()
  email:string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'MiPassword123!'
  })
  @IsString()
  @MinLength(8)
  password:string;
}
