import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateNewGroupRequestDto } from "./dto/create-new-group-request.dto";
import { I18n, I18nContext } from "nestjs-i18n";
import { RequestUserPayload } from "../../common/types/request.type";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateNewGroupResponseDto } from "./dto/create-new-group-response.dto";
import { GetAllGroupsByTeacherResponseDto } from "./dto/get-all-groups-by-teacher-response.dto";
import { AuthGuard } from "../../auth/guards/auth.guard";

@ApiTags("Groups")
@Controller("/groups")
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateNewGroupRequestDto })
  @ApiResponse({ type: CreateNewGroupResponseDto, status: HttpStatus.CREATED })
  async createNewGroup(
    @Body() body: CreateNewGroupRequestDto,
    @Request() req: RequestUserPayload,
    @I18n() i18n: I18nContext,
  ) {
    const userId = req.userId;
    return this.service.createNewGroup(body, userId, i18n);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllGroups() {
    return this.service.getAllActiveGroups();
  }

  @Get("/my")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: GetAllGroupsByTeacherResponseDto,
    status: HttpStatus.OK,
  })
  async getAllGroupsCreatedByTeacher(
    @Request() req: RequestUserPayload,
    @I18n() i18n: I18nContext,
  ) {
    const teacherId = req.userId;
    return this.service.getAllGroupsByTeacher(teacherId, i18n);
  }
}
