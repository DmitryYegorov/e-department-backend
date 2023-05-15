import { Module } from "@nestjs/common";
import { StatisticsController } from "./statistics.controller";
import { StatisticsRepository } from "./statistics.repository";
import { StatisticsService } from "./statistics.service";
import { JwtModule } from "@nestjs/jwt";
import { GradesRepository } from "../classes/repositories/grades.repository";
import { ClassesModule } from "../classes/classes.module";
import { ClassesRepository } from "../classes/repositories/classes.repository";

@Module({
  controllers: [StatisticsController],
  providers: [
    StatisticsService,
    StatisticsRepository,
    GradesRepository,
    ClassesRepository,
  ],
  imports: [JwtModule, ClassesModule],
})
export class StatisticsModule {}
