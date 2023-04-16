import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateClassType } from "./types/create-class.type";
import { Classes } from "@prisma/client";

@Injectable()
export class ClassesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClassType): Promise<Classes> {
    return this.prisma.classes.create({ data });
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
          }
        }
      }
    });
  }
}
