import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { AdminGuard } from 'middleware/admin.middleware';

@Schema({
    timestamps: true,
  })
  export class League {
    @Prop()
    name: string;
    
    @Prop({ type: [String] })
    members: string[];
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
  }
  
  export const LeagueSchema = SchemaFactory.createForClass(Player);



