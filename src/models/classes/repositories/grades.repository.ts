import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { ManyGradesType } from "./types/set-grade.type";

@Injectable()
export class GradesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async setGrade(data: ManyGradesType) {
    return this.prisma.studentGrades.createMany({ data });
  }
}
