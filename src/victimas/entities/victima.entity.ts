import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Victima extends Document {
  @ApiProperty({
    description: 'Nombre de la víctima',
    example: 'Víctima Alpha'
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Habilidades de la víctima',
    example: ['Fuerza', 'Velocidad', 'Inteligencia'],
    type: [String]
  })
  @Prop({ type: [String], required: true })
  skills: string[];

  @ApiProperty({
    description: 'Timestamp de la última vez que fue vista',
    example: 1640995200
  })
  @Prop({ required: true })
  last_seen: number;

  @ApiProperty({
    description: 'Estado de transformación de la víctima',
    example: 'Transformada'
  })
  @Prop({ required: true })
  transformation_status: string;

  @ApiProperty({
    description: 'ID del usuario que capturó la víctima',
    example: '507f1f77bcf86cd799439011'
  })
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  captured_by: Types.ObjectId;

  @ApiProperty({
    description: 'Fecha de captura',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time'
  })
  @Prop({ required: true })
  capture_date: Date;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time'
  })
  @Prop({ default: Date.now })
  created_at: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time'
  })
  @Prop({ default: Date.now })
  updated_at: Date;
}

export const VictimaSchema = SchemaFactory.createForClass(Victima);


