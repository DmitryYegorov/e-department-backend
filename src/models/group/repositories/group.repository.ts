import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateGroupEntityType } from "./types/create-group-entity.type";
import { Group } from "@prisma/client";

@Injectable()
export class GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateGroupEntityType): Promise<Group> {
    return this.prisma.group.create({ data });
  }

  async findAllByTeacherId(teacherId: string): Promise<Group[]> {
    return this.prisma.group.findMany({ where: { createdBy: teacherId } });
  }
}
