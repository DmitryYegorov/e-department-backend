import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateCriteriaType } from "./types/create-criteria.type";

@Injectable()
export class CriteriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCriteriaType) {
    return this.prisma.criteriaEvaluation.create({ data });
  }

  async fetchAllByPlanId(planId: string) {
    return this.prisma.criteriaEvaluation.findMany({
      where: { studyPlanItemId: planId },
    });
  }

  async update(criteriaId: string, name: string, coefficient: number) {
    return this.prisma.criteriaEvaluation.update({
      where: { id: criteriaId },
      data: {
        name,
        coefficient,
      },
    });
  }

  async removeAllById(ids: string[]) {
    return this.prisma.criteriaEvaluation.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
