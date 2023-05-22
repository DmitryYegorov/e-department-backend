import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateClassType } from "./types/create-class.type";
import { Classes } from "@prisma/client";

@Injectable()
export class ClassesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateClass(data: { isShared: boolean }, classId: string) {
    return this.prisma.classes.update({ where: { id: classId }, data });
  }

  async findOne(id: string): Promise<Classes> {
    return this.prisma.classes.findUnique({ where: { id } });
  }

  async getStudentIdsByClass(classId: string) {
    const rows = await this.prisma.classes.findUnique({
      where: { id: classId },
      select: { group: { select: { Student: { select: { id: true } } } } },
    });

    return rows.group.Student.map((s) => s.id);
  }

  async create(data: CreateClassType): Promise<Classes> {
    return this.prisma.classes.create({ data });
  }

  async getClassTable(classId: string) {
    return this.prisma.classes.findUnique({
      where: { id: classId },
      select: {
        id: true,
        isShared: true,
        group: {
          select: {
            id: true,
            name: true,
            Student: {
              select: {
                id: true,
                firstName: true,
                middleName: true,
                lastName: true,
                StudentGrades: {
                  select: {
                    id: true,
                    value: true,
                    done: true,
                    comment: true,
                    criteria: {
                      select: {
                        id: true,
                        studyPlanItem: {
                          select: {
                            id: true,
                            topic: true,
                            order: true,
                          },
                        },
                        name: true,
                        coefficient: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        subject: {
          select: {
            id: true,
            name: true,
            alias: true,
            StudyPlan: {
              select: {
                id: true,
                topic: true,
                order: true,
                CriteriaEvaluation: {
                  select: {
                    id: true,
                    name: true,
                    coefficient: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getClassesBySubjects(subjectId: string) {
    return this.prisma.classes.findMany({
      where: { subjectId },
      select: {
        id: true,
        group: {
          select: {
            id: true,
            name: true,
            subGroup: true,
            description: true,
          },
        },
      },
    });
  }
}
