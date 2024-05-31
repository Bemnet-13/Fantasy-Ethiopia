import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  UseGuards,
  Query,
  NotFoundException,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signup.dto";
import { User } from "./schemas/user.schema";
import { ModifyUserDto } from "./dto/modify-user.dto";
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AdminGuard } from "middleware/admin.middleware";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post("/login")
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
  @Get()
    async getAllPlayers(): Promise<User[]> {
      return this.authService.findAll();
    }
    
    @Put()
    async updateUser(@Req() req, @Body() upUser: ModifyUserDto): Promise<User> {
      const decodedToken = await this.authService.validateToken(req.headers.authorization.replace('Bearer ', ''));
  
      if (!decodedToken) {
        throw new NotFoundException('User not authenticated.');
      }
  
      const userId = decodedToken.id;
  
      
      if (!userId) {
        throw new NotFoundException('User ID not found in the token.');
      }
  
      
      const existingUser = await this.authService.findById(userId);
      if (!existingUser) {
        throw new NotFoundException('User not found.');
      }
  
      const updatedUser = { ...existingUser.toObject(), ...upUser } as User;
  
      return this.authService.updateById(userId, updatedUser);
    }

  
  @Delete()
  async deleteUser(@Req() req): Promise<User> {
    const decodedToken = await this.authService.validateToken(req.headers.authorization.replace('Bearer ', ''));

    if (!decodedToken) {
      throw new NotFoundException('User not authenticated.');
    }

    const userId = decodedToken.id;

    
    if (!userId) {
      throw new NotFoundException('User ID not found in the token.');
    }

    return this.authService.deleteById(userId);
  }

  @UseGuards(AdminGuard)
  @Delete("user/:id")
  async deleteOtherUser(@Req() req,
  @Param("id") id:string
  ): Promise<User> {
    const decodedToken = await this.authService.validateToken(req.headers.authorization.replace('Bearer ', ''));

    if (!decodedToken) {
      throw new NotFoundException('User not authenticated.');
    }

    const userId = id;

    
    if (!userId) {
      throw new NotFoundException('User ID not found in the token.');
    }

    return this.authService.deleteById(userId);
  }

  @UseGuards(AdminGuard)
  @Put("suspend/:id")
  async suspendUser(
    @Param("id") id: string,
    @Req() req): Promise<User> {
    
    var user = this.authService.findById(id);

    if (!user) {
      throw new NotFoundException('User not authenticated.');
    }

    (await user).isSuspended =  true;
    return user;
    
  }

  @UseGuards(AdminGuard)
  @Put("suspend:id")
  
  async promoteUser(
    @Param("id") id: string,
    @Req() req): Promise<User> {
    
    var user = this.authService.findById(id);

    if (!user) {
      throw new NotFoundException('User not authenticated.');
    }

    (await user).role =  'admin';
    return user;
    
  }

}