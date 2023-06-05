import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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
  async getAllGroups(@Query("facultyId") facultyId: string) {
    return this.service.getAllActiveGroups(facultyId);
  }

  @Get("/admin")
  async getAllAdminGroups() {
    return this.service.getAllAdminGroups();
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

  @Get("/:groupId")
  @UseGuards(AuthGuard)
  async getGroupById(@Param("groupId") groupId: string) {
    return this.service.getGroupById(groupId);
  }

  @Patch("/:groupId/activate")
  @UseGuards(AuthGuard)
  async activateGroup(@Param("groupId") groupId: string) {
    return this.service.setActiveState(groupId, true);
  }

  @Patch("/:groupId/deactivate")
  @UseGuards(AuthGuard)
  async deactivateGroup(@Param("groupId") groupId: string) {
    return this.service.setActiveState(groupId, false);
  }

  @Patch("/:groupId/share")
  @UseGuards(AuthGuard)
  async shareGroup(@Param("groupId") groupId: string) {
    return this.service.setSharingState(groupId, true);
  }

  @Patch("/:groupId/unshare")
  @UseGuards(AuthGuard)
  async unshareGroup(@Param("groupId") groupId: string) {
    return this.service.setSharingState(groupId, false);
  }
}
