import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Player } from 'src/players/schemas/player.schema';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  readonly team: string;
}
