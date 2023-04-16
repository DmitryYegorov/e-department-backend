import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { StudyPlanService } from "./study-plan.service";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { AddStudyPlanItemDto } from "./dto/add-study-plan-item.dto";
import { RequestUserPayload } from "../../common/types/request.type";
import { AuthGuard } from "../../auth/guards/auth.guard";

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
}
