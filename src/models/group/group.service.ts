import { Injectable, Logger } from "@nestjs/common";
import { GroupRepository } from "./repositories/group.repository";
import { CreateNewGroupByTeacher } from "./dto/create-new-group-request.dto";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class GroupService {
  private readonly logger = new Logger(GroupService.name);

  constructor(private readonly groupRepo: GroupRepository) {
  }

  async createNewGroup(input: CreateNewGroupByTeacher, i18n: I18nContext) {
    try {
      this.logger.log(
        `Invoked method createNewGroup: ${JSON.stringify(input)}`
      );

      const createdGroup = await this.groupRepo.create(input);

      this.logger.log(
        `Completed method createNewGroup: ${JSON.stringify(input)}`
      );
      return createdGroup;
    } catch (error) {
      this.logger.error(
        `Failed method createNewGroup: ${JSON.stringify({ ...input, error })}`
      );
      throw error;
    }
  }

  async getAllGroupsByTeacher(teacherId: string, i18n: I18nContext) {
    try {
      this.logger.log(
        `Invoked method createNewGroup: ${JSON.stringify({ teacherId })}`
      );

      const list = await this.groupRepo.findAllByTeacherId(teacherId);

      this.logger.log(
        `Completed method createNewGroup: ${JSON.stringify({ teacherId })}`
      );
      return { list };
    } catch (error) {
      this.logger.error(
        `Failed method createNewGroup: ${JSON.stringify({
          teacherId,
          error
        })}`
      );
      throw error;
    }
  }
}
