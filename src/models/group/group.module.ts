import { Module } from "@nestjs/common";
import { GroupRepository } from "./repositories/group.repository";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [GroupController],
  providers: [GroupRepository, GroupService],
  imports: [JwtModule],
})
export class GroupModule {}
