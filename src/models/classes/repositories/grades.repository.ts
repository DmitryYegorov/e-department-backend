import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { ManyGradesType } from "./types/set-grade.type";

@Injectable()
export class GradesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async setGrade(data: ManyGradesType) {
    return this.prisma.studentGrades.createMany({ data });
  }

  async getGradesByStudyPlanIds(
    studentIds: Array<string>,
    planItemIds: Array<string>,
  ) {
    return this.prisma.studentGrades.findMany({
      where: {
        AND: [
          {
            studentId: {
              in: studentIds,
            },
          },
          {
            criteria: {
              studyPlanItemId: {
                in: planItemIds,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        criteria: true,
        value: true,
        done: true,
        comment: true,
        studentId: true,
      },
    });
  }
}
