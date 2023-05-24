import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FacultyService } from "./faculty.service";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { CreateFacultyDto } from "./dto/create-faculty.dto";
import { RequestUserPayload } from "../../common/types/request.type";

@ApiTags("Faculty")
@Controller("/faculty")
export class FacultyController {
  constructor(private readonly service: FacultyService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    return this.service.getAllFaculties();
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(
    @Body() body: CreateFacultyDto,
    @Request() req: RequestUserPayload,
  ) {
    return this.service.updateFacultyData(body, req.userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createNewFaculty(
    @Body() body: CreateFacultyDto,
    @Request() req: RequestUserPayload,
  ) {
    return this.service.createNewFaculty(body, req.userId);
  }
}
