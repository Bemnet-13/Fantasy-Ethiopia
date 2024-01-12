import {
    IsEmpty,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
import { Player } from '../../players/schemas/player.schema';
import { User } from '../schemas/user.schema';
  
  
  export class ModifyUserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsString()
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    readonly password: string;
  
  
    @IsOptional()
    readonly team:string;

  }