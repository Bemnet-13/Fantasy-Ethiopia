import {
    IsEmpty,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { User } from '../../auth/schemas/user.schema';
  import {Player } from '../schemas/player.schema';
  
  export class ModifyLeagueDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    members: string[];

  }
  