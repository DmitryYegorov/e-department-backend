import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ClassesService } from "./classes.service";
import { CreateClassRequestDto } from "./dto/create-class-request.dto";
import { RequestUserPayload } from "../../common/types/request.type";
import { I18n, I18nContext } from "nestjs-i18n";
import { AuthGuard } from "../../auth/guards/auth.guard";

@ApiTags("Classes")
@Controller("classes")
export class ClassesController {
  constructor(private readonly service: ClassesService) {}

  @Post()
  @ApiBody({ type: CreateClassRequestDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createNewClass(
    @Body() body: CreateClassRequestDto,
    @Request() req: RequestUserPayload,
    @I18n() i18n: I18nContext,
  ) {
    const userId = req.userId;
    return this.service.createNewClass(body, userId, i18n);
  }

  @Get("/subject/:subjectId")
  @UseGuards(AuthGuard)
  async getClassesBySubject(@Param("subjectId") subjectId: string) {
    return this.service.getClassesBySubjects(subjectId);
  }

  @Get("/:classId/table")
  @UseGuards(AuthGuard)
  async getClassTable(@Param("classId") classId: string, @Request() req: RequestUserPayload) {
    return this.service.getClassTableStatistics(classId);
  }

  @Get("/shared/:classId/table")
  async getSharedClassTable(@Param("classId") classId: string) {
    return this.service.getSharedClassTableStatistics(classId);
  }

  @Put("/:classId/share")
  @UseGuards(AuthGuard)
  @ApiParam({ name: "classId", type: "string", format: "uuid" })
  async shareTable(
    @Param("classId") classId: string,
    @Request() req: RequestUserPayload,
  ) {
    return this.service.shareClassTable(classId, req.userId);
  }
}
