import { Injectable, Logger } from "@nestjs/common";
import { StudentRepository } from "./repositories/student.repository";
import { I18nContext } from "nestjs-i18n";
import { CreateStudentServiceDto } from "./dto/create-student-request.dto";
import { CreateStudentResponseDto } from "./dto/create-student-response.dto";

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  constructor(private readonly studentRepo: StudentRepository) {}

  async deleteStudent(studentId: string) {
    try {
      this.logger.log(`Invoked method deleteStudent`);

      const res = await this.studentRepo.delete(studentId);

      this.logger.log(`Completed: ${JSON.stringify(res)}`);
      return res;
    } catch (e) {
      this.logger.error(`Failed ${JSON.stringify(e)}`);
      throw e;
    }
  }

  async getStudentProfile(studentId: string) {
    try {
      this.logger.log(
        `Invoked method getStudentProfile: ${JSON.stringify({ studentId })}`,
      );

      const profile = await this.studentRepo.getStudentProfile(studentId);

      this.logger.log(
        `Completed method getStudentProfile: ${JSON.stringify({ profile })}`,
      );
      return profile;
    } catch (error) {
      this.logger.error(
        `Failed method getStudentProfile: ${JSON.stringify({ error })}`,
      );
      throw error;
    }
  }

  async getAll(query = {}) {
    try {
      this.logger.log(`Invoked getAll`);

      const list = await this.studentRepo.findAll(query);

      this.logger.log(`Completed getAll: ${JSON.stringify({ list })}`);

      return { list };
    } catch (e) {
      this.logger.log(`Failed method getAll: ${JSON.stringify(e)}`);
      throw e;
    }
  }

  async updateStudentInfo(studentId: string, data: any) {
    try {
      this.logger.log(
        `Invoked method updateStudentInfo: ${JSON.stringify({
          studentId,
          data,
        })}`,
      );

      const updated = await this.studentRepo.update(studentId, data);

      this.logger.log(
        `Completed method: updateStudentInfo: ${JSON.stringify(updated)}`,
      );
      return updated;
    } catch (error) {
      this.logger.error(
        `Failed method updateStudentInfo: ${JSON.stringify({
          studentId,
          data,
          error,
        })}`,
      );
      throw error;
    }
  }

  async getStudentById(studentId: string) {
    try {
      this.logger.log(`Invoked method getStudentById: ${studentId}`);

      const student = await this.studentRepo.findOne(studentId);

      this.logger.log(
        `Completed method getStudentById: ${JSON.stringify(student)}`,
      );
      return student;
    } catch (error) {
      this.logger.error(
        `Failed method getStudentById: ${JSON.stringify({ studentId, error })}`,
      );
      throw error;
    }
  }

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
