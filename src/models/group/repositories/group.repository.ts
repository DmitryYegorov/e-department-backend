import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateGroupEntityType } from "./types/create-group-entity.type";
import { Group, User } from "@prisma/client";

@Injectable()
export class GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<(Group & { created: User })[]> {
    return this.prisma.group.findMany({
      where: {
        isActive: true,
      },
      include: {
        created: true,
      },
    });
  }

  async create(data: CreateGroupEntityType): Promise<Group> {
    return this.prisma.group.create({ data });
  }

  async findAllByTeacherId(teacherId: string): Promise<Group[]> {
    return this.prisma.group.findMany({ where: { createdBy: teacherId } });
  }
}
