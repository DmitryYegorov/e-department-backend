import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthRepo } from "./repositories/auth.repo";
import { AuthService } from "./services/auth.service";
import { MailModule } from "../mail/mail.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [MailModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthRepo, AuthService],
})
export class AuthModule {}
