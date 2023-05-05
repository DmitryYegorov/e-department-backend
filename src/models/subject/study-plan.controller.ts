import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { StudyPlanService } from "./study-plan.service";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { AddStudyPlanItemDto } from "./dto/add-study-plan-item.dto";
import { RequestUserPayload } from "../../common/types/request.type";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { CreateCriteriaRequestDto } from "./dto/create-criteria-request.dto";

@Controller("/study-plan")
export class StudyPlanController {
  constructor(private readonly service: StudyPlanService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AddStudyPlanItemDto })
  @ApiResponse({ status: HttpStatus.CREATED })
  async addStudyPlanItem(
    @Body() body: AddStudyPlanItemDto,
    @Request() req: RequestUserPayload,
  ) {
    const user = req.userId;
    return this.service.addStudyPlanItemBySubject(body, user);
  }

  @Get("/:planId")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getItemById(@Param("planId") planId: string) {
    return this.service.getItemWithCriteriaById(planId);
  }

  @Delete("/:planId")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async removePlanItemById(@Param("planId") planId: string) {
    return this.service.deleteItemFromStudyPlanById(planId);
  }

  @Post("/criteria")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createCriteriaForPlanItem(
    @Body()
    body: CreateCriteriaRequestDto,
    @Request()
    req: RequestUserPayload,
  ) {
    return this.service.createCriteriaForStudyPlanItem(body, req.userId);
  }
}
