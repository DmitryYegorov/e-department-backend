import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get("/all")
  async getAll() {
    return this.service.getAllUsers();
  }

  @Post("/:userId/deactivate")
  async deactivateUser(@Param("userId") userId: string) {
    return this.service.deactivate(userId);
  }

  @Delete("/:userId")
  async deleteUser(@Param("userId") userId: string) {
    return this.service.remove(userId);
  }
}
