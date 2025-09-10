import { IsEmail, IsString, IsStrongPassword, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@ejemplo.com',
    format: 'email'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
    minLength: 2
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 símbolo)',
    example: 'MiPassword123!',
    minLength: 8
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  password: string;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    example: Role.SLAVE,
    enum: Role
  })
  @IsEnum(Role)
  roles: Role;
}
