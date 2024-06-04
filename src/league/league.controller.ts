import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
  } from "@nestjs/common";
  
  import { LeagueService } from "./league.service";
  import { CreateLeagueDto } from "./dto/create-league.dto";
  import { ModifyLeagueDto } from "./dto/modify-league.dto";
  import { League} from "./schemas/league.schema";
  import { User } from "../auth/schemas/user.schema";
  import { Query as ExpressQuery } from "express-serve-static-core";
  import { AdminGuard } from "../middleware/admin.middleware";
  import { AuthService } from "../auth/auth.service";
  
  
  @Controller("leagues")
  export class LeagueController {
    constructor(
      private leagueService: LeagueService,
      private authService: AuthService
    ) {}
  
    @Get()
    async getAllLeagues(@Query() query: ExpressQuery): Promise<League[]> {
      return this.leagueService.findAll(query);
    }

    @Post("/join")
    async getTeam(@Body() body: {leagueId: string },
    @Req() request: Request) {
      const authHeader = (request.headers as unknown as { authorization: string })
      .authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("und1");
      return undefined;
    }

    const token = authHeader.split(" ")[1];
    console.log(token);
    const decodedToken = await this.authService.validateToken(token);

    if (!decodedToken) {
      console.log("und2");
      return undefined;
    }

    const userId = decodedToken.id;

      const leagueId = body.leagueId;
      console.log(userId, "usrid");
      const user = await this.authService.findById(userId);
      const league = await this.leagueService.findById(leagueId);
      console.log(user, "user");
      if (!league) {
        throw new NotFoundException('League not found');
      }
      try {
      league.members.push(userId)
      console.log(league.members);
      await this.leagueService.updateById(leagueId, league)
       } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('An error occurred while adding the user to the league');
      }
    }
     return  {
      message: true
    }; 
    }
  
    
    @Post()
    async createLeague(
      @Body()
      uPplayer: CreateLeagueDto,
      @Req() req
    ): Promise<League> {
      const league = uPplayer as unknown as League;
      return this.leagueService.create(league);
    }
    

    @Put(":id")
    async updateLeague(
      @Param("id")
      id: string,
      @Body()
      uPleague: ModifyLeagueDto
    ): Promise<League> {
      const league = uPleague as unknown as League;
      return this.leagueService.updateById(id, league);
    }
  
    @Delete(":id")
    async deleteLeague(
      @Param("id")
      id: string
    ): Promise<League> {
      return this.leagueService.deleteById(id);
    }
  }
  