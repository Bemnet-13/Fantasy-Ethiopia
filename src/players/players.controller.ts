import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";

import { PlayersService } from "./players.service";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { ModifyPlayerDto } from "./dto/modify-player.dto";
import { Player } from "./schemas/player.schema";
import { User } from "../auth/schemas/user.schema";
import { Query as ExpressQuery } from "express-serve-static-core";
import { AdminGuard } from "../middleware/admin.middleware";
import { AuthService } from "../auth/auth.service";


@Controller("players")
export class PlayersController {
  constructor(
    private playerService: PlayersService,
    private authService: AuthService
  ) {}

  @Get()
  async getAllPlayers(@Query() query: ExpressQuery): Promise<Player[]> {
    return this.playerService.findAll(query);
  }
  @Post("/team")
  async getTeam(@Body() body: { id: string }): Promise<Player[]> {
    const userId = body.id;

    console.log(userId, "usrid");
    let teams = [];
    const user = await this.authService.findById(userId);
    console.log(user, "user");
    if (!user.team) {
      return [];
    }

    const playersId = user.team.split("/").reverse().filter(Boolean);
    playersId.pop();
    console.log(playersId);
    const playerPromises = playersId.map((playerId) =>
      this.playerService.findById(playerId)
    );

    teams = await Promise.all(playerPromises);

    if (teams) {
      return teams.filter(Boolean);
    } else {
      return [];
    }
  }

  @Get("/team")
  async getUserTeam(@Req() req): Promise<Player[]> {
    const authHeader = (req.headers as unknown as { authorization: string })
      .authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return undefined;
    }
    const token = authHeader.split(" ")[1];

    const decodedToken = await this.authService.validateToken(token);

    if (!decodedToken) {
      return undefined;
    }
    const userId = decodedToken.id;
    console.log(userId, "usrid dispalyed");
    let teams = [];
    const user = await this.authService.findById(userId);
    console.log(user, "user");
    if (!user.team) {
      return [];
    }

    const playersId = user.team.split("/").reverse().filter(Boolean);
    playersId.pop();
    console.log(playersId);
    const playerPromises = playersId.map((playerId) =>
      this.playerService.findById(playerId)
    );

    teams = await Promise.all(playerPromises);

    if (teams) {
      return teams.filter(Boolean);
    } else {
      return [];
    }
  }

  @Post()
  @UseGuards(AdminGuard)
  async createplayer(
    @Body()
    uPplayer: CreatePlayerDto,
    @Req() req
  ): Promise<Player> {
    // console.log(CreatePlayerDto);
    const player = uPplayer as unknown as Player;
    return this.playerService.create(player);
  }

  @Get(":id")
  async getPlayer(
    @Param("id") id: string,
    @Req() request: Request
  ): Promise<User | JSON> {
    const authHeader = (request.headers as unknown as { authorization: string })
      .authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return undefined;
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await this.authService.validateToken(token);

    if (!decodedToken) {
      return undefined;
    }

    const userId = decodedToken.id;

    const user = await this.authService.findById(userId);

    const player = this.playerService.findById(id);
    user.team += "/" + id;
    console.log(id);
    const savedUser = await user.save();
    return savedUser;
  }

  @Put(":id")
  @UseGuards(AdminGuard)
  async updatePlayer(
    @Param("id")
    id: string,
    @Body()
    uPplayer: ModifyPlayerDto
  ): Promise<Player> {
    const player = uPplayer as unknown as Player;
    return this.playerService.updateById(id, player);
  }

  @Delete(":id")
  @UseGuards(AdminGuard)
  async deletePlayer(
    @Param("id")
    id: string
  ): Promise<Player> {
    return this.playerService.deleteById(id);
  }
}
