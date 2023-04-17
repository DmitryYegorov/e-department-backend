import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateCriteriaType } from "./types/create-criteria.type";

@Injectable()
export class CriteriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Array<CreateCriteriaType>) {
    return this.prisma.criteriaEvaluation.createMany({ data });
  }
}
