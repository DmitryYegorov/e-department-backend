import { Injectable, Logger } from "@nestjs/common";
import { StudyPlanRepository } from "./repositories/study-plan.repository";
import { AddStudyPlanItemDto } from "./dto/add-study-plan-item.dto";

@Injectable()
export class StudyPlanService {
  private readonly logger = new Logger(StudyPlanService.name);

  constructor(private readonly studyPlanRepo: StudyPlanRepository) {}

  async addStudyPlanItemBySubject(data: AddStudyPlanItemDto, userId: string) {
    try {
      this.logger.log(`Invoked addStudyPlanItemBySubject`);

      const create = await this.studyPlanRepo.create({
        ...data,
        createdBy: userId,
      });

      this.logger.log(
        `Completed addStudyPlanItemBySubject: ${JSON.stringify({ create })}`,
      );
      return create;
    } catch (error) {
      this.logger.error(
        `Failed method addStudyPlanItemBySubject: ${JSON.stringify({ error })}`,
      );
      throw error;
    }
  }
}
