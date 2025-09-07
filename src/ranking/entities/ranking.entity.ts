import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Leaderboard extends Document {
  @Prop({ type: String, ref: 'User', required: true })
  slave_id: string; // Aquí va el ObjectId del User

  @Prop({ type: Number, default: 0 })
  total_capturas: number;

  @Prop({ type: [String], default: [] })
  recompensas: string[];
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);

