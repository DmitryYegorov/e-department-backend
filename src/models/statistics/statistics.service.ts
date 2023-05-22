import { Injectable, Logger } from "@nestjs/common";
import { CreateStatisticsByGroupDto } from "./dto/create-statistics-by-group.dto";
import { GradesRepository } from "../classes/repositories/grades.repository";
import { ClassesRepository } from "../classes/repositories/classes.repository";
import { StatisticsRepository } from "./statistics.repository";
import * as _ from "lodash";

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);

  constructor(
    private readonly gradesRepo: GradesRepository,
    private readonly classesRepo: ClassesRepository,
    private readonly statisticsRepo: StatisticsRepository,
  ) {}

  async getAllStatisticsByClass(userId: string) {
    try {
      this.logger.log(
        `Invoked method getAllStatisticsByClass: ${JSON.stringify({
          userId,
        })}`,
      );

      const res = await this.statisticsRepo.getAllByClassId(userId);

      this.logger.log(
        `Completed method getAllStatisticsByClass: ${JSON.stringify({
          userId,
          list: res,
        })}`,
      );

      return { list: res };
    } catch (error) {
      this.logger.log(
        `Failed method getAllStatisticsByUserId: ${JSON.stringify({
          userId,
          error,
        })}`,
      );
      throw error;
    }
  }

  async getStatisticsView(statisticsId: string) {
    try {
      this.logger.log(`Invoked method getStatisticsView: ${statisticsId}`);

      const [studentGrades, topics] = await Promise.all([
        this.statisticsRepo.getStudentSummaryGradesByStatistic(statisticsId),
        this.statisticsRepo.getStudyPlanItemsByStatisticsId(statisticsId),
      ]);

      this.logger.log(
        `Completed method getStatisticsView: ${JSON.stringify(
          studentGrades,
          null,
          2,
        )}`,
      );

      return { studentGrades, topics: topics.map((t) => t.studyPlanItem) };
    } catch (error) {
      this.logger.error(
        `Failed method getStatisticsView: ${JSON.stringify({ error })}`,
      );
      throw error;
    }
  }

  async createStatisticsByGroup(
    data: CreateStatisticsByGroupDto,
    userId: string,
  ) {
    try {
      this.logger.log(
        `Invoked method createStatisticsByGroup: ${JSON.stringify({
          data,
          userId,
        })}`,
      );

      const studentIds = await this.classesRepo.getStudentIdsByClass(
        data.classId,
      );

      const studentGradesByPlan = await this.gradesRepo.getGradesByStudyPlanIds(
        studentIds,
        data.studyPlanItemIds,
      );

      const groupStatisticsId = await this.statisticsRepo.createGroupStatistics(
        data,
        userId,
      );

      const groupedStudentGradesByPlan = _.groupBy(
        studentGradesByPlan,
        "criteria.studyPlanItemId",
      );

      const gradesList = Object.values(groupedStudentGradesByPlan)
        .map((v) => {
          const groupedByStudent = _.groupBy(v, "studentId");

          return Object.keys(groupedByStudent).map((studentId) => {
            // this.logger.debug(groupedByStudent[studentId]);
            const denominator = groupedByStudent[studentId]
              .map((a) => a.criteria.coefficient)
              .reduce((prev, acc) => prev + acc, 0);

            let totalGrade = 0;
            groupedByStudent[studentId].forEach((sgp) => {
              totalGrade += +(
                (sgp.value * sgp.criteria.coefficient) /
                denominator
              );
            });

            return {
              studentId,
              studyPlanItemId:
                groupedByStudent[studentId][0].criteria.studyPlanItemId,
              totalGrade: +totalGrade.toFixed(2),
            };
          });
        })
        .flat();

      const groupedByStudent = _.groupBy(gradesList, "studentId");
      const result = Object.keys(groupedByStudent).map((studentId) => {
        const byStudent = groupedByStudent[studentId];
        const summaryGrade = +(
          byStudent
            .map((item) => item.totalGrade)
            .reduce((prev, acc) => acc + prev, 0) / data.studyPlanItemIds.length
        ).toFixed();

        return { studentId, summaryGrade };
      });

      const [savedGrades, topics] = await Promise.all([
        this.statisticsRepo.saveStudentsGradesByStatistics(
          result,
          groupStatisticsId,
        ),
        this.statisticsRepo.getStudyPlanItemsByStatisticsId(groupStatisticsId),
        this.statisticsRepo.saveStudyPlansByStatistics(
          groupStatisticsId,
          data.studyPlanItemIds,
        ),
      ]);

      this.logger.log(
        `Completed method createStatisticsByGroup: ${JSON.stringify(
          savedGrades,
          null,
          2,
        )}`,
      );

      return {
        groupStatisticsId,
        savedGrades,
        topics: topics.map((t) => t.studyPlanItem),
      };
    } catch (error) {
      this.logger.error(
        `Failed method createStatisticsByGroup: ${JSON.stringify(
          { input: { data, userId } },
          error,
        )}`,
      );
      throw error;
    }
  }
}
