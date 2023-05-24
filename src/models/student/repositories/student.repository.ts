import { Injectable } from "@nestjs/common";
import { Student } from "@prisma/client";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateStudentType } from "./types/create-student.type";

@Injectable()
export class StudentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentProfile(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        StudentGrades: {
          select: {
            id: true,
            criteria: {
              select: {
                id: true,
                name: true,
                coefficient: true,
                studyPlanItem: true,
              },
            },
            value: true,
            comment: true,
            done: true,
            createdAt: true,
          },
        },
        group: {
          select: {
            id: true,
            group: true,
            course: true,
            subGroup: true,
            Classes: {
              select: {
                subject: true,
              },
            },
            faculty: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(
    options: Partial<{
      fullName: string;
      facultyId: string;
      course: number;
      group: number;
      subGroup: number;
    }> = {},
  ): Promise<Student[]> {
    let where = {};

    if (options.fullName) {
      const [firstName, middleName, lastName] = options.fullName.split(" ");
      where = {
        ...where,
        firstName: { startsWith: firstName },
        middleName: { startsWith: middleName },
        lastName: { startsWith: lastName },
      };
    }

    if (options.facultyId) {
      where = { ...where, group: { AND: [{ facultyId: options.facultyId }] } };
    }
    if (options.course) {
      where = { ...where, group: { course: +options.course } };
    }
    if (options.group) {
      where = { ...where, group: { group: +options.group } };
    }
    if (options.subGroup) {
      where = { ...where, group: { subGroup: +options.subGroup } };
    }

    console.log({ where });

    return this.prisma.student.findMany({
      where,
      orderBy: {
        firstName: "asc",
      },
      include: {
        group: {
          include: {
            faculty: true,
          },
        },
      },
    });
  }

  async create(data: CreateStudentType): Promise<Student> {
    return this.prisma.student.create({ data });
  }

  async findAllByGroupId(groupId: string): Promise<Student[]> {
    return this.prisma.student.findMany({ where: { groupId } });
  }

  async findOne(studentId: string): Promise<Student> {
    return this.prisma.student.findUnique({ where: { id: studentId } });
  }

  async update(id: string, data: any) {
    return this.prisma.student.update({ where: { id }, data });
  }
}
