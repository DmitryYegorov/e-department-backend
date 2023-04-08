import { SubjectRepo } from "./repositories/subject.repo";
import { Injectable, Logger } from "@nestjs/common";
import { CreateNewSubject } from "./dto/create-new-subject-request.dto";
import { I18nContext } from "nestjs-i18n";
import { CreateNewSubjectResponseDto } from "./dto/create-new-subject-response.dto";

@Injectable()
export class SubjectService {
  private readonly logger = new Logger(SubjectService.name);

  constructor(private readonly subjectRepo: SubjectRepo) {}

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
        `Failed method createNewSubject: ${JSON.stringify(input)}`,
      );
      throw error;
    }
  }
}
