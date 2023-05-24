import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Faculty } from "@prisma/client";

export type CreateFacultyRecord = {
  name: string;
  shortName: string;
};

@Injectable()
export class FacultyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFacultyRecord): Promise<Faculty> {
    return this.prisma.faculty.create({ data });
  }

  async update(data: CreateFacultyRecord, id: string): Promise<Faculty> {
    return this.prisma.faculty.update({ data, where: { id } });
  }

  async find(id: string): Promise<Faculty> {
    return this.prisma.faculty.findUnique({ where: { id } });
  }

  async findAll(): Promise<Faculty[]> {
    return this.prisma.faculty.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async remove(id: string) {
    return this.prisma.faculty.delete({ where: { id } });
  }
}
