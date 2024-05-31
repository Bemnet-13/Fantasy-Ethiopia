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
  
  export class ModifyPlayerDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsString()
    readonly club: string;
  
    
    @IsNotEmpty()
    readonly Score: number;

  
    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;
  }
  