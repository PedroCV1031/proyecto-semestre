import {Controller,Post,Body}from '@nestjs/common';
import {AuthService}from './auth.service';
import {CreateAuthDto}from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { User } from 'src/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController{
  constructor(private readonly authService:AuthService){}

  @Public()
  @ApiOperation({ 
    summary: 'Registrar nuevo usuario',
    description: 'Crea una nueva cuenta de usuario en el sistema'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario registrado exitosamente',
    type: User
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiBody({ type: CreateAuthDto })
  @Post('register')
  create(@Body()dto:CreateAuthDto){
    return this.authService.create(dto);
  }

  @Public()
  @ApiOperation({ 
    summary: 'Iniciar sesión',
    description: 'Autentica un usuario y devuelve un token JWT'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login exitoso',
    type: AuthResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciales inválidas' 
  })
  @ApiBody({ type: LoginAuthDto })
  @Post('login')
  login(@Body()dto:LoginAuthDto){
    return this.authService.login(dto);
  }
}
