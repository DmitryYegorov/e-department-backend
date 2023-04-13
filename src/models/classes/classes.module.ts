import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ClassesService } from "./classes.service";
import { ClassesRepository } from "./repositories/classes.repository";
import { ClassesController } from "./classes.controller";

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, ClassesRepository],
  imports: [JwtModule],
})
export class ClassesModule {}
