import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { LeagueSchema } from './schemas/league.schema';
import { AdminGuard } from '../middleware/admin.middleware';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [
      AuthModule,
      MongooseModule.forFeature([{ name: 'League', schema: LeagueSchema }]),
      JwtModule
    ],
    controllers: [LeagueController],
    providers: [LeagueService,AdminGuard],
  })
  export class LeagueModule {}
