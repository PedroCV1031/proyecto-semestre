import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Leaderboard extends Document {
  @ApiProperty({
    description: 'ID del usuario esclavo',
    example: '507f1f77bcf86cd799439011'
  })
  @Prop({ type: String, ref: 'User', required: true })
  slave_id: string; // Aquí va el ObjectId del User

  @ApiProperty({
    description: 'Total de capturas realizadas por el usuario',
    example: 15,
    default: 0
  })
  @Prop({ type: Number, default: 0 })
  total_capturas: number;

  @ApiProperty({
    description: 'Lista de recompensas obtenidas por el usuario',
    example: ['Primera captura', '10 capturas', 'Cazador experto'],
    type: [String],
    default: []
  })
  @Prop({ type: [String], default: [] })
  recompensas: string[];
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);

