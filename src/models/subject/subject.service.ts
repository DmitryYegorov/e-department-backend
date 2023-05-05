import { SubjectRepo } from "./repositories/subject.repo";
import { Injectable, Logger } from "@nestjs/common";
import { CreateNewSubject } from "./dto/create-new-subject-request.dto";
import { I18nContext } from "nestjs-i18n";
import { CreateNewSubjectResponseDto } from "./dto/create-new-subject-response.dto";
import { GetSubjectListResponseDto } from "./dto/get-subject-list-response.dto";
import { StudyPlanRepository } from "./repositories/study-plan.repository";

@Injectable()
export class SubjectService {
  private readonly logger = new Logger(SubjectService.name);

  constructor(
    private readonly subjectRepo: SubjectRepo,
    private readonly studyPlanRepo: StudyPlanRepository,
  ) {}

  async getTeachersSubjects(
    teacherId: string,
  ): Promise<GetSubjectListResponseDto> {
    try {
      this.logger.log(`Invoked method getTeachersSubjects: ${teacherId}`);

      const list = await this.subjectRepo.findAllByUser(teacherId);

      this.logger.log(`Completed method getTeachersSubjects`);

      return { list };
    } catch (error) {
      this.logger.log(
        `Failed method getTeachersSubjects: ${JSON.stringify({
          teacherId,
          error,
        })}`,
      );
      throw error;
    }
  }

  async createNewSubject(
    input: CreateNewSubject,
    i18n: I18nContext,
  ): Promise<CreateNewSubjectResponseDto> {
    try {
      this.logger.log(
        `Invoked method createNewSubject: ${JSON.stringify(input)}`,
      );

      const created = await this.subjectRepo.create(input);

      this.logger.log(
        `Completed method createNewSubject: ${JSON.stringify(created)}`,
      );

      return created;
    } catch (error) {
      this.logger.error(
        `Failed method createNewSubject: ${JSON.stringify({
          ...input,
          error,
        })}`,
      );
      throw error;
    }
  }

  async getStudyPlanBySubject(subjectId: string) {
    try {
      this.logger.log(
        `Invoked method getStudyPlanBySubject: ${JSON.stringify({
          subjectId,
        })}`,
      );

      const plan = await this.studyPlanRepo.getPlanBySubjectId(subjectId);
      const subject = await this.subjectRepo.findById(subjectId);

      this.logger.log(
        `Completed getStudyPlanBySubject: ${JSON.stringify({ plan })}`,
      );
      return { plan, subject };
    } catch (error) {
      this.logger.error(
        `Failed method getStudyPlanBySubject: ${JSON.stringify({
          subjectId,
          error,
        })}`,
      );
      throw error;
    }
  }
}
