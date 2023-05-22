import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateStatisticsByGroupDto } from "./dto/create-statistics-by-group.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class StatisticsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByClassId(classId: string) {
    return this.prisma.groupStatistics.findMany({
      where: { classId: classId },
      select: {
        id: true,
        title: true,
        comment: true,
        createdAt: true,
        // createdBy: true,
      },
      orderBy: { createdAt: Prisma.SortOrder.desc },
    });
  }

  async getStudyPlanItemsByStatisticsId(id: string) {
    return this.prisma.studyPlanGroupStatistics.findMany({
      where: { groupStatisticsId: id },
      select: {
        studyPlanItem: true,
      },
    });
  }

  async getStudentSummaryGradesByStatistic(id: string) {
    const summaryGrades =
      await this.prisma.studentGradesGroupStatistics.findMany({
        where: { groupStatisticsId: id },
        select: {
          studentId: true,
          summaryGrade: true,
        },
      });

    const allStudentsByGroup = await this.prisma.groupStatistics.findFirst({
      where: { id },
      select: {
        classRoom: {
          select: {
            group: {
              select: {
                Student: true,
              },
            },
          },
        },
      },
    });

    return allStudentsByGroup.classRoom.group.Student.map((st) => {
      const grade = summaryGrades.find((sg) => sg.studentId === st.id);

      return {
        id: st.id,
        name: `${st.firstName} ${st.middleName} ${st.lastName}`,
        grade: grade?.summaryGrade || 0,
      };
    });
  }

  async createGroupStatistics(
    input: CreateStatisticsByGroupDto,
    createdBy: string,
  ): Promise<string> {
    const { comment, classId, title } = input;

    const createdStatisticsRecord = await this.prisma.groupStatistics.create({
      data: { classId, comment, createdBy, title },
    });
    return createdStatisticsRecord.id;
  }

  async saveStudentsGradesByStatistics(
    grades: Array<{ studentId: string; summaryGrade: number }>,
    groupStatisticsId: string,
  ) {
    return this.prisma.studentGradesGroupStatistics.createMany({
      data: grades.map((g) => ({ ...g, groupStatisticsId })),
    });
  }

  async saveStudyPlansByStatistics(
    groupStatisticsId: string,
    studyPlanIds: Array<string>,
  ) {
    return this.prisma.studyPlanGroupStatistics.createMany({
      data: studyPlanIds.map((id) => ({
        studyPlanId: id,
        groupStatisticsId,
      })),
    });
  }
}
