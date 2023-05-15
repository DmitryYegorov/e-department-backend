import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateGroupEntityType } from "./types/create-group-entity.type";
import { Group, User, Faculty } from "@prisma/client";

@Injectable()
export class GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, data: Partial<Group>) {
    return this.prisma.group.update({ where: { id }, data });
  }

  async findOne(id: string): Promise<Group> {
    return this.prisma.group.findUnique({ where: { id } });
  }

  async findAll(): Promise<
    (Group & { created: User; faculty: Faculty | null })[]
  > {
    return this.prisma.group.findMany({
      where: {
        isActive: true,
      },
      include: {
        created: true,
        faculty: true,
      },
    });
  }

  async create(data: CreateGroupEntityType): Promise<Group> {
    return this.prisma.group.create({ data });
  }

  async findAllByTeacherId(
    teacherId: string,
  ): Promise<(Group & { faculty: Faculty | null })[]> {
    return this.prisma.group.findMany({
      where: { createdBy: teacherId },
      include: { faculty: true },
    });
  }
}
