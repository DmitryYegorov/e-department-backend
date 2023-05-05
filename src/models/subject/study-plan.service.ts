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

  async deleteItemFromStudyPlanById(id: string) {
    try {
      this.logger.log(
        `Invoked method deleteItemFromStudyPlanById: ${JSON.stringify({ id })}`,
      );

      const deleted = await this.studyPlanRepo.removeOne(id);

      this.logger.log(
        `Completed method deleteItemFromStudyPlanById: ${JSON.stringify({
          deleted,
        })}`,
      );
      return deleted;
    } catch (error) {
      this.logger.error(
        `Failed method deleteItemFromStudyPlanById: ${JSON.stringify({
          id,
          error,
        })}`,
      );
      throw error;
    }
  }

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

      const { topic, order } = data;

      // const existingData = await this.criteriaRepo.fetchAllByPlanId(
      //   data.studyPlanItemId,
      // );

      const created = [];
      const updated = [];

      for await (const ce of data.criteria) {
        if (ce.id) {
          const res = await this.criteriaRepo.update(
            ce.id,
            ce.name,
            ce.coefficient,
          );
          updated.push(res);
        } else {
          const res = await this.criteriaRepo.create({
            studyPlanItemId: data.studyPlanItemId,
            createdBy: userId,
            name: ce.name,
            coefficient: ce.coefficient,
          });
          created.push(res);
        }
      }

      await this.studyPlanRepo.updatePlanItem(data.studyPlanItemId, {
        topic,
        order,
      });

      this.logger.log(
        `Completed method createCriteriaForStudyPlanItem: ${JSON.stringify({
          created,
          updated,
        })}`,
      );
      return [...created, updated];
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
