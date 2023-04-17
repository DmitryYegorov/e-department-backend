import { Injectable, Logger } from "@nestjs/common";
import { StudyPlanRepository } from "./repositories/study-plan.repository";
import { AddStudyPlanItemDto } from "./dto/add-study-plan-item.dto";
import { CreateCriteriaRequestDto } from "./dto/create-criteria-request.dto";
import { CriteriaRepository } from "./repositories/criteria.repository";

@Injectable()
export class StudyPlanService {
  private readonly logger = new Logger(StudyPlanService.name);

  constructor(
    private readonly studyPlanRepo: StudyPlanRepository,
    private readonly criteriaRepo: CriteriaRepository,
  ) {}

  async createCriteriaForStudyPlanItem(
    data: CreateCriteriaRequestDto,
    userId: string,
  ) {
    try {
      this.logger.log(
        `Invoked method createCriteriaForStudyPlanItem: ${JSON.stringify({
          data,
        })}`,
      );

      const created = await this.criteriaRepo.create(
        data.criteria.map((c) => ({
          name: c.name,
          coefficient: c.coefficient,
          studyPlanItemId: data.studyPlanItemId,
          createdBy: userId,
        })),
      );

      this.logger.log(
        `Completed method createCriteriaForStudyPlanItem: ${JSON.stringify(
          created,
        )}`,
      );
      return created;
    } catch (error) {
      this.logger.log(
        `Failed method createCriteriaForStudyPlanItem: ${JSON.stringify({
          data,
        })}`,
      );
      throw error;
    }
  }

  async getItemWithCriteriaById(planId: string) {
    try {
      this.logger.log(
        `Invoked method getItemWithCriteriaById: ${JSON.stringify({ planId })}`,
      );

      const planItem = await this.studyPlanRepo.getPlanItemById(planId);

      this.logger.log(
        `Completed method getItemWithCriteriaById: ${JSON.stringify({
          planItem,
        })}`,
      );
      return { planItem };
    } catch (error) {
      this.logger.error(
        `Failed method getItemWithCriteriaById: ${JSON.stringify({
          planId,
          error,
        })}`,
      );
      throw error;
    }
  }

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
