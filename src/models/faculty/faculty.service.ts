import { Injectable, Logger } from "@nestjs/common";
import { FacultyRepository } from "./faculty.repository";

@Injectable()
export class FacultyService {
  private readonly logger = new Logger(FacultyService.name);

  constructor(private readonly repo: FacultyRepository) {}

  async getAllFaculties() {
    try {
      this.logger.log(`Invoked method getAllFaculties`);

      const list = await this.repo.findAll();

      this.logger.log(
        `Completed method getAllFaculties: ${JSON.stringify(list)}`,
      );

      return { list };
    } catch (error) {
      this.logger.error(
        `Failed method getAllFaculties: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }
}
