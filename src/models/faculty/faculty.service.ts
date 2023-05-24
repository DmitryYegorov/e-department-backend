import { Injectable, Logger } from "@nestjs/common";
import { FacultyRepository } from "./faculty.repository";
import { CreateFacultyDto } from "./dto/create-faculty.dto";

@Injectable()
export class FacultyService {
  private readonly logger = new Logger(FacultyService.name);

  constructor(private readonly repo: FacultyRepository) {}

  async updateFacultyData(body: CreateFacultyDto, userId: string) {
    try {
      this.logger.log(
        `Invoked method updateFacultyData: ${JSON.stringify({ body, userId })}`,
      );

      const updated = await this.repo.update(
        { name: body.name, shortName: body.shortName },
        body.id,
      );

      this.logger.log(
        `Completed method updateFacultyData: ${JSON.stringify({ updated })}`,
      );
      return updated;
    } catch (error) {
      this.logger.error(
        `Failed method updateFacultyData:${JSON.stringify({ error })}`,
      );
      throw error;
    }
  }

  async createNewFaculty(body: CreateFacultyDto, userId: string) {
    try {
      this.logger.log(
        `Invoked method createNewFaculty: ${JSON.stringify({ body, userId })}`,
      );

      const created = await this.repo.create(body);

      this.logger.log(
        `Completed method createNewFaculty: ${JSON.stringify({ created })}`,
      );
      return created;
    } catch (error) {
      this.logger.error(
        `Failed method createNewFaculty:${JSON.stringify({ error })}`,
      );
      throw error;
    }
  }

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
