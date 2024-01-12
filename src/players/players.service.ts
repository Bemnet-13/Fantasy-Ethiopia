
import {
    BadRequestException,
    Injectable,   
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import * as mongoose from 'mongoose';
  import { Player } from './schemas/player.schema';
  
  import { Query } from 'express-serve-static-core';
  import { User } from '../auth/schemas/user.schema';
@Injectable()
export class PlayersService {
    constructor(
        @InjectModel(Player.name)
        private playerModel: mongoose.Model<Player>,
        @InjectModel(Player.name)
        private userModel: mongoose.Model<User>
      ) {}
    
      async findAll(query: Query): Promise<Player[]> {
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);
    
        const keyword = query.keyword
          ? {
              name: {
                $regex: query.keyword,
                $options: 'i',
              },
            }
          : {};
    
        const players = await this.playerModel
          .find({ ...keyword })
          .limit(resPerPage)
          .skip(skip);
        return players;
      }
    
      async create(player: Player): Promise<Player> {
        const data = Object.assign(player);
    
        const res = await this.playerModel.create(data);
        return res;
      }
    
      async findById(id: string): Promise<Player> {
        const isValidId = mongoose.isValidObjectId(id);
    
        if (!isValidId) {
          throw new BadRequestException('Please enter correct id.');
        }
    
        const player = await this.playerModel.findById(id);
    
        if (!player) {
          throw new NotFoundException('Player not found.');
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
    }
    