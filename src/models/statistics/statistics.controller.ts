import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StatisticsService } from "./statistics.service";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RequestUserPayload } from "../../common/types/request.type";
import { CreateStatisticsByGroupDto } from "./dto/create-statistics-by-group.dto";

@ApiTags("Statistics")
@Controller("/statistics")
export class StatisticsController {
  constructor(private readonly service: StatisticsService) {}

  @Post("/by-group")
  @UseGuards(AuthGuard)
  async createStatisticsByGroup(
    @Body() body: CreateStatisticsByGroupDto,
    @Request() req: RequestUserPayload,
  ) {
    const userId = req.userId;
    return this.service.createStatisticsByGroup(body, userId);
  }

  @Get("/class/:classId")
  async getStatisticsListByClass(@Param("classId") classId: string) {
    return this.service.getAllStatisticsByClass(classId);
  }

  @Get("/:id")
  // @UseGuards(AuthGuard)
  async getStatisticsView(@Param("id") id: string) {
    return this.service.getStatisticsView(id);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard)
  async deleteStatistics(@Param("id") statisticsId: string) {
    return this.service.deleteStatisticsById(statisticsId);
  }
}
