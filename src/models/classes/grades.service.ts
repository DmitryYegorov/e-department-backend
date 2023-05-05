import { Injectable, Logger } from "@nestjs/common";
import { GradesRepository } from "./repositories/grades.repository";
import { SetStudentGradeRequestDto } from "./dto/set-student-grade-request.dto";

@Injectable()
export class GradesService {
  private readonly logger = new Logger(GradesService.name);

  constructor(private readonly gradesRepo: GradesRepository) {}

  async setStudentGrade(body: SetStudentGradeRequestDto, userId: string) {
    try {
      this.logger.log(
        `Invoked method setStudentGrade: ${JSON.stringify({ body, userId })}`,
      );

      const { grades, done, comment } = body;

      const setted = await this.gradesRepo.setGrade(
        grades.map((g) => ({ ...g, createdBy: userId, done, comment })),
      );

      this.logger.log(
        `Completed method setStudentGrade: ${JSON.stringify(setted)}`,
      );

      return setted;
    } catch (error) {
      this.logger.error(
        `Failed method setStudentGrade: ${JSON.stringify({
          body,
          userId,
          error,
        })}`,
      );
      throw error;
    }
  }
}
