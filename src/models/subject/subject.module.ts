import { Module } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { SubjectRepo } from "./repositories/subject.repo";
import { SubjectController } from "./subject.controller";
import { JwtModule } from "@nestjs/jwt";
import { StudyPlanRepository } from "./repositories/study-plan.repository";
import { StudyPlanController } from "./study-plan.controller";
import { StudyPlanService } from "./study-plan.service";
import { CriteriaRepository } from "./repositories/criteria.repository";

@Module({
  controllers: [SubjectController, StudyPlanController],
  providers: [
    SubjectService,
    SubjectRepo,
    StudyPlanService,
    StudyPlanRepository,
    CriteriaRepository,
  ],
  imports: [JwtModule],
})
export class SubjectModule {}
