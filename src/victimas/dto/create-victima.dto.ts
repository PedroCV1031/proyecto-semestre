import {IsString,IsArray,IsInt,IsDateString,MinLength,ArrayMinSize,Min} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVictimaDto {
  @ApiProperty({
    description: 'Nombre de la víctima',
    example: 'Víctima Alpha',
    minLength: 2
  })
  @IsString()
  @MinLength(2)
  name:string;

  @ApiProperty({
    description: 'Habilidades de la víctima',
    example: ['Fuerza', 'Velocidad', 'Inteligencia'],
    type: [String],
    minItems: 1
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({each:true})
  skills:string[];

  @ApiProperty({
    description: 'Timestamp de la última vez que fue vista',
    example: 1640995200,
    minimum: 1
  })
  @Min(1)
  last_seen:number;

  @ApiProperty({
    description: 'Estado de transformación de la víctima',
    example: 'Transformada',
    minLength: 2
  })
  @IsString()
  @MinLength(2)
  transformation_status:string;

  @ApiProperty({
    description: 'Fecha de captura',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time'
  })
  @IsDateString()
  capture_date:string;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time'
  })
  @IsDateString()
  created_at:string;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time'
  })
  @IsDateString()
  updated_at:string;
}


