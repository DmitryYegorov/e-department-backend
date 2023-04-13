import { Injectable, Logger } from "@nestjs/common";
import { ClassesRepository } from "./repositories/classes.repository";
import { CreateClassRequestDto } from "./dto/create-class-request.dto";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class ClassesService {
  private readonly logger = new Logger(ClassesService.name);

  constructor(private readonly classesRepo: ClassesRepository) {}

  async createNewClass(
    input: CreateClassRequestDto,
    userId: string,
    i18n: I18nContext,
  ) {
    try {
      this.logger.log(
        `Invoked method createNewClass: ${JSON.stringify(input)}, ${userId}`,
      );

      const newClass = await this.classesRepo.create({
        ...input,
        teacherId: userId,
      });

      this.logger.log(
        `Completed method createNewClass: ${JSON.stringify(newClass)}`,
      );
      return newClass;
    } catch (error) {
      this.logger.error(
        `Failed method createNewClass: ${JSON.stringify({
          ...input,
          userId,
          error,
        })}`,
      );
      throw error;
    }
  }
}
