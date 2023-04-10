import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  Get,
} from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { CreateNewSubjectRequestDto } from "./dto/create-new-subject-request.dto";
import { I18n, I18nContext } from "nestjs-i18n";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RequestUserPayload } from "../../common/types/request.type";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateNewSubjectResponseDto } from "./dto/create-new-subject-response.dto";
import { GetSubjectListResponseDto } from "./dto/get-subject-list-response.dto";

@ApiTags("Subject")
@Controller("/subjects")
export class SubjectController {
  constructor(private readonly service: SubjectService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateNewSubjectRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateNewSubjectResponseDto,
  })
  async createNewSubject(
    @Body() body: CreateNewSubjectRequestDto,
    @Request() req: RequestUserPayload,
    @I18n() i18n: I18nContext,
  ) {
    const userId = req.userId;
    return this.service.createNewSubject({ ...body, teacherId: userId }, i18n);
  }

  @Get("/my")
  @UseGuards(AuthGuard)
  @ApiResponse({ type: GetSubjectListResponseDto })
  @ApiBearerAuth()
  async getSubjectsByTeacher(
    @Request() req: RequestUserPayload,
    @I18n() i18n: I18nContext,
  ) {
    const userId = req.userId;
    return this.service.getTeachersSubjects(userId);
  }
}
