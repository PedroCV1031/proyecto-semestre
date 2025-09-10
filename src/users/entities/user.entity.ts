import {Prop,Schema,SchemaFactory}from '@nestjs/mongoose';
import {Document}from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';

@Schema()
export class User extends Document{
  @ApiProperty({
    description: 'Email único del usuario',
    example: 'usuario@ejemplo.com',
    format: 'email'
  })
  @Prop({required:true,unique:true})
  email:string;

  @ApiProperty({
    description: 'Contraseña hasheada del usuario',
    example: '$2b$10$hashedpassword...'
  })
  @Prop({required:true})
  password:string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez'
  })
  @Prop({required:true})
  name:string;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    example: Role.SLAVE,
    enum: Role
  })
  @Prop({required:true, enum: Role})
  roles:Role;
}

export const UserSchema=SchemaFactory.createForClass(User);
