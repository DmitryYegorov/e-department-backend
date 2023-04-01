import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { RegisterInputType } from "./types/register-input.type";
import { User } from "@prisma/client";

@Injectable()
export class AuthRepo {
  constructor(private readonly prisma: PrismaService) {}

  async register(input: RegisterInputType): Promise<User> {
    return this.prisma.user.create({ data: input });
  }

  async checkExistingEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return !!user;
  }
}
