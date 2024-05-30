import { IsEmail, IsNotEmpty, IsString, MinLength, IsEmpty, IsOptional, IsIn } from 'class-validator';
import { Player } from '../../players/schemas/player.schema';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  readonly team: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['user', 'admin'])
  role: string;

  isSuspended: boolean;
}

