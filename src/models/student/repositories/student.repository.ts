import { Injectable } from "@nestjs/common";
import { Student } from "@prisma/client";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateStudentType } from "./types/create-student.type";

@Injectable()
export class StudentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    options: Partial<{
      facultyId: string;
      course: number;
      group: number;
      subGroup: number;
    }> = {},
  ): Promise<Student[]> {
    let where = {};

    if (options.facultyId) {
      where = { ...where, group: { facultyId: options.facultyId } };
    }
    if (options.course) {
      where = { ...where, group: { course: options.course } };
    }
    if (options.subGroup) {
      where = { ...where, group: { subGroup: options.subGroup } };
    }

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
