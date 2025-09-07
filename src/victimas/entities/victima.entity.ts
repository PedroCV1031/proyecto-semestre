import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Victima extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], required: true })
  skills: string[];

  @Prop({ required: true })
  last_seen: number;

  @Prop({ required: true })
  transformation_status: string;

  // CORRECTO → ahora como ObjectId
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  captured_by: Types.ObjectId;

  @Prop({ required: true })
  capture_date: Date;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const VictimaSchema = SchemaFactory.createForClass(Victima);


