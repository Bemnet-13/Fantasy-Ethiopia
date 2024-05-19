
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { LeagueModule } from './league/league.module';
import { AuthModule } from './auth/auth.module';
// import { PlayersController } from './players/players.controller';
// import { PlayersService } from './players/players.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    PlayersModule,
    LeagueModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
