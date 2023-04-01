import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthRegistrationRequestDto } from "../dto/auth-registration-request.dto";
import { AuthLoginRequestDto } from "../dto/auth-login-request.dto";
import { I18n, I18nContext } from "nestjs-i18n";

@Controller("/auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/register")
  async register(
    @Body() body: AuthRegistrationRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.service.register(body, i18n);
  }

  @Post("/login/email")
  async loginEmail(
    @Body() body: AuthLoginRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.service.login(body, i18n);
  }

  @Post("/confirm-email")
  async confirmEmail(@Body() body, @I18n() i18n: I18nContext) {
    return this.service.confirmEmail(body, i18n);
  }
}
