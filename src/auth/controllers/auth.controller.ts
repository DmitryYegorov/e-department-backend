import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthRegistrationRequestDto } from "../dto/auth-registration-request.dto";
import { AuthLoginRequestDto } from "../dto/auth-login-request.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/register")
  async register(@Body() body: AuthRegistrationRequestDto) {
    return this.service.register(body);
  }

  @Post("/login/email")
  async loginEmail(@Body() body: AuthLoginRequestDto) {
    return this.service.login(body);
  }

  @Post("/confirm-email")
  async confirmEmail(@Body() body) {
    return this.service.confirmEmail(body);
  }
}
