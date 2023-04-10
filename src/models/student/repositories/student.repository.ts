import { Injectable } from "@nestjs/common";
import { Student } from "@prisma/client";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateStudentType } from "./types/create-student.type";

@Injectable()
export class StudentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStudentType): Promise<Student> {
    return this.prisma.student.create({ data });
  }

  async findAllByGroupId(groupId: string): Promise<Student[]> {
    return this.prisma.student.findMany({ where: { groupId } });
  }
}
