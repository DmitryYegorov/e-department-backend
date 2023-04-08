import { Module } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { SubjectRepo } from "./repositories/subject.repo";
import { SubjectController } from "./subject.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepo],
  imports: [JwtModule],
})
export class SubjectModule {}
