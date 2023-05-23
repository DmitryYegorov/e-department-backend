import { Module } from "@nestjs/common";
import { FacultyController } from "./faculty.controller";
import { FacultyService } from "./faculty.service";
import { FacultyRepository } from "./faculty.repository";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [FacultyController],
  providers: [FacultyService, FacultyRepository],
  imports: [JwtModule.register({})],
})
export class FacultyModule {}
