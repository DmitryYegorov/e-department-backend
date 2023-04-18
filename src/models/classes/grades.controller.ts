import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { GradesService } from "./grades.service";
import { RequestUserPayload } from "../../common/types/request.type";
import { SetStudentGradeRequestDto } from "./dto/set-student-grade-request.dto";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { ApiTags } from "@nestjs/swagger";

@Controller("/grades")
@ApiTags("Grades")
export class GradesController {
  constructor(private readonly service: GradesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async setStudentGrade(
    @Body() body: SetStudentGradeRequestDto,
    @Request() req: RequestUserPayload,
  ) {
    const { userId } = req;
    return this.service.setStudentGrade(body, userId);
  }
}
