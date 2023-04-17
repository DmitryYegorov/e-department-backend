import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateStudyPlanItemType } from "./types/create-study-plan-item.type";
import { StudyPlan } from "@prisma/client";

@Injectable()
export class StudyPlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getPlanItemById(id: string) {
    return this.prisma.studyPlan.findUnique({
      where: { id },
      select: {
        id: true,
        topic: true,
        description: true,
        order: true,
        CriteriaEvaluation: {
          select: {
            id: true,
            name: true,
            coefficient: true,
          },
        },
      },
    });
  }

  async getPlanBySubjectId(subjectId: string) {
    return this.prisma.studyPlan.findMany({
      where: {
        subjectId,
      },
      orderBy: {
        order: "asc",
      },
      select: {
        id: true,
        topic: true,
        description: true,
        order: true,
      },
    });
  }

  async create(data: CreateStudyPlanItemType): Promise<StudyPlan> {
    return this.prisma.studyPlan.create({ data });
  }
}
