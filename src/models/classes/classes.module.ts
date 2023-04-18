import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ClassesService } from "./classes.service";
import { ClassesRepository } from "./repositories/classes.repository";
import { ClassesController } from "./classes.controller";
import { GradesService } from "./grades.service";
import { GradesRepository } from "./repositories/grades.repository";
import { GradesController } from "./grades.controller";

@Module({
  controllers: [ClassesController, GradesController],
  providers: [
    ClassesService,
    ClassesRepository,
    GradesService,
    GradesRepository,
  ],
  imports: [JwtModule],
})
export class ClassesModule {}
