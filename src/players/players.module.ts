import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { PlayerSchema } from './schemas/player.schema';
import { AdminGuard } from 'src/middleware/admin.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
      AuthModule,
      MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
      JwtModule
    ],
    controllers: [PlayersController],
    providers: [PlayersService,AdminGuard],
  })
  export class PlayersModule {}
