import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ClassesRepository } from "./repositories/classes.repository";
import { CreateClassRequestDto } from "./dto/create-class-request.dto";
import { I18nContext } from "nestjs-i18n";
import * as _ from "lodash";

@Injectable()
export class ClassesService {
  private readonly logger = new Logger(ClassesService.name);

  constructor(private readonly classesRepo: ClassesRepository) {}

  async shareClassTable(classId: string, userId: string) {
    try {
      this.logger.log(
        `Invoked method shareClassTable: ${JSON.stringify({
          classId,
          userId,
        })}`,
      );

      const classesRecord = await this.classesRepo.findOne(classId);

      if (classesRecord.teacherId !== userId) {
        throw new ForbiddenException(
          "У вас нет разрешения для данной операции",
        );
      }

      const updated = await this.classesRepo.updateClass(
        { isShared: !classesRecord.isShared },
        classesRecord.id,
      );

      this.logger.log(
        `Completed method shareClassTable: ${JSON.stringify({
          classesRecord,
          updated,
        })}`,
      );
      return updated;
    } catch (error) {
      this.logger.error(
        `Failed method shareClassTable: ${JSON.stringify({
          classId,
          userId,
          error,
        })}`,
      );
      throw error;
    }
  }

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

  async getSharedClassTableStatistics(classId: string) {
    try {
      this.logger.log(
        `Invoked method getSharedClassTableStatistics: ${JSON.stringify({
          classId,
        })}`,
      );

      const record = await this.classesRepo.findOne(classId);

      if (!record || !record.isShared) {
        throw new NotFoundException(
          "Данные не найдены. Скорее всего Вы пытаесь запросить ресурс, которого не существует либо Вы не имеете к нему доступ",
        );
      }

      const res = await this.getClassTableStatistics(classId);

      this.logger.log(
        `Completed method getSharedClassTableStatistics: ${JSON.stringify({
          classId,
          res,
        })}`,
      );
      return res;
    } catch (error) {
      this.logger.error(
        `Failed method getSharedClassTableStatistics: ${JSON.stringify({
          classId,
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

      const table = row.group.Student.map((st) => {
        const grade = (function () {
          const groupedPlanByTopicId = _.groupBy(plan, "id");
          const groupedGradesByTopicId = _.groupBy(
            st.StudentGrades,
            "criteria.studyPlanItem.id",
          );

          const res = {
            ...Object.fromEntries([
              ...Object.keys(groupedPlanByTopicId).map((topicId) => [
                topicId,
                groupedGradesByTopicId[topicId] || null,
              ]),
            ]),
          };

          return res;
        })();

        const summary = (function () {
          const res: number[] = [];
          Object.values(grade).forEach((grs) => {
            // console.log({ GRS: JSON.stringify(grs, null, 2) });
            if (grs === null) {
              res.push(0);
            }
            if (grs !== null && Array.isArray(grs)) {
              const summCoef = grs
                .map((g) => g.criteria.coefficient)
                .reduce((a, b) => a + b, 0);
              console.log({ coef: JSON.stringify(grs, null, 2), summCoef });
              const innerRes = grs
                .map((g) => (g.value * g.criteria.coefficient) / summCoef)
                .reduce((a, b) => a + b, 0);
              res.push(innerRes || 0);
            }
          });

          // console.log(JSON.stringify(res, null, 2));

          return +(
            res.reduce((prev, acc) => prev + acc, 0) / plan.length
          ).toFixed(0);
        })();

        return {
          studentId: st.id,
          studentName: `${st.firstName} ${st.middleName} ${st.lastName}`,
          grade,
          summary,
        };
      });

      const result = {
        isShared: row.isShared,
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
