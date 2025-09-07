import {IsEmail,IsString,IsStrongPassword,MinLength}from 'class-validator';

export class CreateAuthDto{
  @IsEmail()
  email:string;

  @IsString()
  @MinLength(2)
  name:string;

  @IsStrongPassword({
    minLength:8,
    minLowercase:1,
    minUppercase:1,
    minNumbers:1,
    minSymbols:1
  })
  password:string;

  @IsString()
  role:string;
}

