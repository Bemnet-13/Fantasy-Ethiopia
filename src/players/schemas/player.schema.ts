import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

@Schema({
    timestamps: true,
  })
  export class Player {
    @Prop()
    name: string;
  
    @Prop()
    club: string;
  
    @Prop()
    Score: number;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
  }
  
  export const PlayerSchema = SchemaFactory.createForClass(Player);