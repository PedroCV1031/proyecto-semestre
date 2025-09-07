import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({ collection: 'Leaderboard' })
export class Leaderboard extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  slave_id: Types.ObjectId; // referencia al usuario tipo Slave

  @Prop({ default: 0 })
  total_capturas: number;

  @Prop({ type: [String], default: [] })
  recompensas: string[];
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);
