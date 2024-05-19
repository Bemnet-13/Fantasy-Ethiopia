import {
    IsEmpty,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { User } from '../../auth/schemas/user.schema';
  import {League } from '../schemas/league.schema';
  
  export class ModifyLeagueDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    members: string[];

  }
  