import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateSubjectType } from "./types/create-subject.type";
import { Subject } from "@prisma/client";

@Injectable()
export class SubjectRepo {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSubjectType): Promise<Subject> {
    return this.prisma.subject.create({ data });
  }

  async findById(id: string): Promise<Subject> {
    return this.prisma.subject.findUnique({ where: { id } });
  }
}
