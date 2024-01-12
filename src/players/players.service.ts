
import {
    BadRequestException,
    Injectable,   
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import * as mongoose from 'mongoose';
  import { Player } from './schemas/player.schema';
  import { JwtService } from '@nestjs/jwt';
  import { Query } from 'express-serve-static-core';
  import { User } from '../auth/schemas/user.schema';
@Injectable()
export class PlayersService {
    constructor(
        @InjectModel(Player.name)
        private playerModel: mongoose.Model<Player>,
        @InjectModel(Player.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService,
      ) {}
    
      async findAll(query: Query): Promise<Player[]> {
    
        const players = await this.playerModel
          .find();
        return players;
      }
    
      async create(player: Player): Promise<Player> {
        const data = Object.assign(player);
    
        const res = await this.playerModel.create(data);
        return res;
      }
    
      async findById(id: string): Promise<Player | null > {
        const isValidId = mongoose.isValidObjectId(id);
    
        if (!isValidId) {
          return null;
          // throw new BadRequestException('Please enter correct id.');
        }
    
        const player = await this.playerModel.findById(id);
    
        if (!player) {
          // throw new NotFoundException('Player not found.');
          return null;
        }
    
        return player;
      }
    
      async updateById(id: string, player: Player): Promise<Player> {
        return await this.playerModel.findByIdAndUpdate(id, player, {
          new: true,
          runValidators: true,
        });
      }
    
      async deleteById(id: string): Promise<Player> {
        return await this.playerModel.findByIdAndDelete(id);
      }
      async addById(id: string): Promise<User>{
        const user = this.userModel.findById(id);
        return user;
      }

      async validateToken(token: string): Promise<any> {
        try {
          const decoded = this.jwtService.verify(token);
          return decoded;
        } catch (error) {
          console.error('Invalid token:', error.message);
          return null;
        }
      }
    }
    