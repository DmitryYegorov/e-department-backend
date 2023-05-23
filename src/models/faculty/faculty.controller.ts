import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FacultyService } from "./faculty.service";
import { AuthGuard } from "../../auth/guards/auth.guard";

@ApiTags("Faculty")
@Controller("/faculty")
export class FacultyController {
  constructor(private readonly service: FacultyService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    return this.service.getAllFaculties();
  }
}
