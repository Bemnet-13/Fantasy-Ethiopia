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
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signup.dto";
import { User } from "./schemas/user.schema";
import { ModifyUserDto } from "./dto/modify-user.dto";
import { Query as ExpressQuery } from 'express-serve-static-core';

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

  @Put(":id")
  async updateUser(
    @Param("id")
    id: string,
    @Body()
    upUser: ModifyUserDto
  ): Promise<User> {
    const user = upUser as User;
    return this.authService.updateById(id, user);
  }
  @Delete(":id")
  async deleteUser(
    @Param("id")
    id: string
  ): Promise<User> {
    return this.authService.deleteById(id);
  }
}
