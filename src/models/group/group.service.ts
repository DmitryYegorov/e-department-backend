import { Injectable, Logger } from "@nestjs/common";
import { GroupRepository } from "./repositories/group.repository";
import { CreateNewGroupRequestDto } from "./dto/create-new-group-request.dto";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class GroupService {
  private readonly logger = new Logger(GroupService.name);

  constructor(private readonly groupRepo: GroupRepository) {}

  async getGroupById(groupId) {
    try {
      this.logger.log(`Invoked method getGroupById: ${groupId}`);

      const group = await this.groupRepo.findOne(groupId);

      this.logger.log(
        `Completed method getGroupById: ${JSON.stringify(group)}`,
      );
      return group;
    } catch (e) {
      this.logger.error(`Failed method getGroupById: ${groupId}`);
      throw e;
    }
  }

  async getAllActiveGroups() {
    try {
      this.logger.log(`Invoked method getAllActiveGroups`);
      const list = await this.groupRepo.findAll();

      this.logger.log(
        `Completed method getAllActiveGroups: ${JSON.stringify(list)}`,
      );
      return {
        list: list.map((i) => ({
          id: i.id,
          name: i.name,
          course: i.course,
          group: i.group,
          subGroup: i.subGroup,
          isShared: i.isShared,
          createdId: i.createdBy,
          facultyShortName: i.faculty?.shortName,
          facultyId: i.faculty?.id,
          createdName: `${i.created.firstName} ${i.created.middleName} ${i.created.lastName}`,
        })),
      };
    } catch (error) {
      this.logger.error(
        `Failed method getAllActiveGroups: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async createNewGroup(
    input: CreateNewGroupRequestDto,
    userId: string,
    i18n: I18nContext,
  ) {
    try {
      this.logger.log(
        `Invoked method createNewGroup: ${JSON.stringify(input)}`,
      );

      const createdGroup = await this.groupRepo.create({
        ...input,
        createdBy: userId,
      });

      this.logger.log(
        `Completed method createNewGroup: ${JSON.stringify(input)}`,
      );
      return createdGroup;
    } catch (error) {
      this.logger.error(
        `Failed method createNewGroup: ${JSON.stringify({ ...input, error })}`,
      );
      throw error;
    }
  }

  async getAllGroupsByTeacher(teacherId: string, i18n: I18nContext) {
    try {
      this.logger.log(
        `Invoked method createNewGroup: ${JSON.stringify({ teacherId })}`,
      );

      const list = await this.groupRepo.findAllByTeacherId(teacherId);

      this.logger.log(
        `Completed method createNewGroup: ${JSON.stringify({ teacherId })}`,
      );
      return { list };
    } catch (error) {
      this.logger.error(
        `Failed method createNewGroup: ${JSON.stringify({
          teacherId,
          error,
        })}`,
      );
      throw error;
    }
  }
}
