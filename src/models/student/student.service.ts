import { Injectable, Logger } from "@nestjs/common";
import { StudentRepository } from "./repositories/student.repository";
import { I18nContext } from "nestjs-i18n";
import { CreateStudentServiceDto } from "./dto/create-student-request.dto";
import { CreateStudentResponseDto } from "./dto/create-student-response.dto";

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  constructor(private readonly studentRepo: StudentRepository) {}

  async createNewStudent(
    input: CreateStudentServiceDto,
    i18n: I18nContext,
  ): Promise<CreateStudentResponseDto> {
    try {
      this.logger.log(
        `Invoked method createNewStudent: ${JSON.stringify(input)}`,
      );

      const student = await this.studentRepo.create(input);

      this.logger.log(
        `Completed method createNewStudent: ${JSON.stringify(student)}`,
      );
      return student;
    } catch (error) {
      this.logger.error(
        `Failed method createNewStudent: ${JSON.stringify(input, error)}`,
      );
      throw error;
    }
  }

  async getAllByGroupId(groupId: string, i18n: I18nContext) {
    try {
      this.logger.log(
        `Invoked method getAllByGroupId: ${JSON.stringify({ groupId })}`,
      );

      const students = await this.studentRepo.findAllByGroupId(groupId);

      this.logger.log(
        `Completed method getAllByGroupId: ${JSON.stringify(students)}`,
      );
      return students;
    } catch (error) {
      this.logger.error(
        `Failed method getAllByGroupId: ${JSON.stringify({ groupId, error })}`,
      );
      throw error;
    }
  }
}
