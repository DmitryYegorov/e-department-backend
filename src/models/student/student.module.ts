import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { StudentRepository } from "./repositories/student.repository";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  imports: [JwtModule],
})
export class StudentModule {}
