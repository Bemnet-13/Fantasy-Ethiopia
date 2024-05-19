
import {
    BadRequestException,
    Injectable,   
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import * as mongoose from 'mongoose';
  import { League } from './schemas/league.schema';
  import { JwtService } from '@nestjs/jwt';
  import { Query } from 'express-serve-static-core';
  import { User } from '../auth/schemas/user.schema';
@Injectable()
export class LeagueService {
    constructor(
        @InjectModel(League.name)
        private leagueModel: mongoose.Model<League>,
        @InjectModel(League.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService,
      ) {}
    
      async findAll(query: Query): Promise<League[]> {
    
        const leagues = await this.leagueModel
          .find();
        return leagues;
      }
    
      async create(league: League): Promise<League> {
        const data = Object.assign(league);
    
        const res = await this.leagueModel.create(data);
        return res;
      }
    
      async findById(id: string): Promise<League | null > {
        const isValidId = mongoose.isValidObjectId(id);
    
        if (!isValidId) {
          return null;
          // throw new BadRequestException('Please enter correct id.');
        }
    
        const league = await this.leagueModel.findById(id);
    
        if (!league) {
          // throw new NotFoundException('Player not found.');
          return null;
        }
    
        return league;
      }
    
      async updateById(id: string, league: League): Promise<League> {
        return await this.leagueModel.findByIdAndUpdate(id, league, {
          new: true,
          runValidators: true,
        });
      }
    
      async deleteById(id: string): Promise<League> {
        return await this.leagueModel.findByIdAndDelete(id);
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
    