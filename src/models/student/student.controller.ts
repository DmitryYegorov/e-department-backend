import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { StudentService } from "./student.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateStudentRequestDto } from "./dto/create-student-request.dto";
import { CreateStudentResponseDto } from "./dto/create-student-response.dto";
import { I18n, I18nContext } from "nestjs-i18n";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { GetSubjectListResponseDto } from "../subject/dto/get-subject-list-response.dto";

@ApiTags("Students")
@Controller("/students")
export class StudentController {
  constructor(private readonly service: StudentService) {}

  @Get("/profile/:studentId")
  @UseGuards(AuthGuard)
  async getStudentProfile(@Param("studentId") studentId: string) {
    return this.service.getStudentProfile(studentId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll(
    @Query("fullName") fullName: string,
    @Query("facultyId") facultyId: string,
    @Query("course") course: number,
    @Query("group") group: number,
    @Query("subGroup") subGroup: number,
  ) {
    const params = { facultyId, course, group, subGroup, fullName };
    console.log({ params });
    const query =
      Object.fromEntries(
        Object.keys(params).map((key) => {
          if (params[key]) {
            return [key, params[key]];
          }
          return [];
        }),
      ) || {};

    return this.service.getAll(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateStudentRequestDto })
  @ApiResponse({ type: CreateStudentResponseDto, status: HttpStatus.OK })
  async createNewStudent(
    @Body() body: CreateStudentRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.service.createNewStudent(body, i18n);
  }

  @Get("/:studentId")
  @UseGuards(AuthGuard)
  async getStudentById(@Param("studentId") studentId: string) {
    return this.service.getStudentById(studentId);
  }

  @Put("/:studentId")
  @UseGuards(AuthGuard)
  async updateStudent(
    @Param("studentId") studentId: string,
    @Body() body: any,
  ) {
    return this.service.updateStudentInfo(studentId, body);
  }

  @Get("/group/:groupId")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: "groupId", type: "string", format: "uuid" })
  @ApiResponse({ type: GetSubjectListResponseDto, status: HttpStatus.OK })
  async getStudentsByGroup(
    @Param("groupId") groupId: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.service.getAllByGroupId(groupId, i18n);
  }

  @Delete("/:studentId")
  async deleteStudent(@Param("studentId") studentId: string) {
    return this.service.deleteStudent(studentId);
  }
}
