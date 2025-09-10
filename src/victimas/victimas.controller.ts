import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards}from '@nestjs/common';
import { VictimasService } from './victimas.service';
import {CreateVictimaDto}from './dto/create-victima.dto';
import {UpdateVictimaDto}from './dto/update-victima.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Victima } from './entities/victima.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('victimas')
@Controller('victimas')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class VictimasController{
  constructor(private readonly victimasService:VictimasService){}

  @Roles(Role.SLAVE, Role.MASTER, Role.DEVELOPER)
  @ApiOperation({ 
    summary: 'Crear nueva víctima',
    description: 'Registra una nueva víctima capturada en el sistema (SLAVE, MASTER, DEVELOPER)'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Víctima creada exitosamente',
    type: Victima
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol SLAVE, MASTER o DEVELOPER' 
  })
  @ApiBody({ type: CreateVictimaDto })
  @Post()
  create(@Body()createVictimaDto:CreateVictimaDto){
    return this.victimasService.create(createVictimaDto);
  }

  @Roles(Role.MASTER, Role.DEVELOPER)
  @ApiOperation({ 
    summary: 'Obtener todas las víctimas',
    description: 'Retorna una lista de todas las víctimas capturadas (Solo MASTER y DEVELOPER)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de víctimas obtenida exitosamente',
    type: [Victima]
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol MASTER o DEVELOPER' 
  })
  @Get()
  findAll(){
    return this.victimasService.findAll();
  }

  @Roles(Role.MASTER, Role.DEVELOPER)
  @ApiOperation({ 
    summary: 'Obtener víctima por ID',
    description: 'Retorna la información de una víctima específica (Solo MASTER y DEVELOPER)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Víctima encontrada exitosamente',
    type: Victima
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Víctima no encontrada' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol MASTER o DEVELOPER' 
  })
  @ApiParam({ name: 'id', description: 'ID único de la víctima', example: '507f1f77bcf86cd799439011' })
  @Get(':id')
  findOne(@Param('id')id:string){
    return this.victimasService.findOneById(id);
  }

  @Roles(Role.MASTER, Role.DEVELOPER)
  @ApiOperation({ 
    summary: 'Actualizar víctima',
    description: 'Actualiza la información de una víctima existente (Solo MASTER y DEVELOPER)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Víctima actualizada exitosamente',
    type: Victima
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Víctima no encontrada' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol MASTER o DEVELOPER' 
  })
  @ApiParam({ name: 'id', description: 'ID único de la víctima', example: '507f1f77bcf86cd799439011' })
  @ApiBody({ type: UpdateVictimaDto })
  @Patch(':id')
  update(@Param('id')id:string,@Body()dto:UpdateVictimaDto){
    return this.victimasService.updateById(id,dto);
  }

  @Roles(Role.MASTER)
  @ApiOperation({ 
    summary: 'Eliminar víctima',
    description: 'Elimina una víctima del sistema (Solo MASTER)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Víctima eliminada exitosamente',
    type: Victima
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Víctima no encontrada' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado. Se requiere rol MASTER' 
  })
  @ApiParam({ name: 'id', description: 'ID único de la víctima', example: '507f1f77bcf86cd799439011' })
  @Delete(':id')
  remove(@Param('id')id:string){
    return this.victimasService.removeById(id);
  }
}



