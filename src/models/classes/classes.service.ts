import { Injectable, Logger } from "@nestjs/common";
import { ClassesRepository } from "./repositories/classes.repository";
import { CreateClassRequestDto } from "./dto/create-class-request.dto";
import { I18nContext } from "nestjs-i18n";
import * as _ from "lodash";

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

  async getClassesBySubjects(subjectId: string) {
    try {
      this.logger.log(
        `Invoked method getClassesBySubjects: ${JSON.stringify({ subjectId })}`,
      );

      const list = await this.classesRepo.getClassesBySubjects(subjectId);

      this.logger.log(
        `Completed method getClassesBySubjects: ${JSON.stringify(list)}`,
      );
      return { list };
    } catch (error) {
      this.logger.error(
        `Failed method getClassesBySubjects: ${JSON.stringify({
          subjectId,
          error,
        })}`,
      );
      throw error;
    }
  }

  async getClassTableStatistics(classId: string) {
    try {
      this.logger.log(
        `Invoked getClassTableStatistics: ${JSON.stringify({ classId })}`,
      );

      const row = await this.classesRepo.getClassTable(classId);

      const subjectName = row.subject.name;
      const groupName = row.group.name;

      const plan = row.subject.StudyPlan.map((sp) => ({
        criteria: sp.CriteriaEvaluation,
        topic: sp.topic,
        order: sp.order,
        id: sp.id,
      })).sort((a, b) => a.order - b.order);

      const table = row.group.Student.map((st) => ({
        studentId: st.id,
        studentName: `${st.firstName} ${st.middleName} ${st.lastName}`,
        grade: (function () {
          const groupedPlanByTopicId = _.groupBy(plan, "id");
          const groupedGradesByTopicId = _.groupBy(
            st.StudentGrades,
            "criteria.studyPlanItem.id",
          );

          return {
            ...Object.fromEntries([
              ...Object.keys(groupedPlanByTopicId).map((topicId) => [
                topicId,
                groupedGradesByTopicId[topicId] || null,
              ]),
            ]),
          };
        })(),
      }));

      const result = {
        groupName,
        subjectName,
        table,
        plan,
      };

      this.logger.log(
        `Completed getClassTableStatistics: ${JSON.stringify({ result })}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Failed getClassTableStatistic: ${JSON.stringify({ classId, error })}`,
      );
      throw error;
    }
  }
}
