import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Query } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Player } from '../players/schemas/player.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, role } = signUpDto;
    var usedBefore = await this.userModel.findOne({email});

    if (usedBefore) {
      throw new BadRequestException('Please enter correct id.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = this.jwtService.sign({ id: user._id, role });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<Object> {
    const { email, password, role } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    if (user.role != role) {
      throw new UnauthorizedException('Wrong Role. Role not matched correctly.');
    }

    if (user.isSuspended == true){
      throw new UnauthorizedException('Account suspended! Contact Admins' );
    }
    
    const token = this.jwtService.sign({ id: user._id, role });

    return { "token":  token,
              "userId": user._id 
          }

}

  async updateById(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
  async findById(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Player not found.');
    }

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
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
}
