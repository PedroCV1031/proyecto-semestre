import {Controller,Get,Patch,Delete,Param,Body,UseGuards}from '@nestjs/common';
import {UsersService}from './users.service';
import {UpdateUserDto}from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController{
  constructor(private readonly usersService:UsersService){}

  @Roles(Role.MASTER, Role.DEVELOPER)
  @ApiOperation({ 
    summary: 'Obtener todos los usuarios',
    description: 'Retorna una lista de todos los usuarios registrados en el sistema (Solo MASTER y DEVELOPER)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuarios obtenida exitosamente',
    type: [User]
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol MASTER o DEVELOPER' 
  })
  @Get()
  findAll(){return this.usersService.findAll();}

  @Roles(Role.MASTER, Role.DEVELOPER)
  @ApiOperation({ 
    summary: 'Obtener usuario por ID',
    description: 'Retorna la información de un usuario específico (Solo MASTER y DEVELOPER)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario encontrado exitosamente',
    type: User
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol MASTER o DEVELOPER' 
  })
  @ApiParam({ name: 'id', description: 'ID único del usuario', example: '507f1f77bcf86cd799439011' })
  @Get(':id')
  findOne(@Param('id')id:string){return this.usersService.findOne(id);}

  @Roles(Role.MASTER)
  @ApiOperation({ 
    summary: 'Actualizar usuario',
    description: 'Actualiza la información de un usuario existente (Solo MASTER)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario actualizado exitosamente',
    type: User
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol MASTER' 
  })
  @ApiParam({ name: 'id', description: 'ID único del usuario', example: '507f1f77bcf86cd799439011' })
  @Patch(':id')
  update(@Param('id')id:string,@Body()dto:UpdateUserDto){return this.usersService.update(id,dto);}

  @Roles(Role.MASTER)
  @ApiOperation({ 
    summary: 'Eliminar usuario',
    description: 'Elimina un usuario del sistema (Solo MASTER)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario eliminado exitosamente',
    type: User
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol MASTER' 
  })
  @ApiParam({ name: 'id', description: 'ID único del usuario', example: '507f1f77bcf86cd799439011' })
  @Delete(':id')
  remove(@Param('id')id:string){return this.usersService.remove(id);}
}

