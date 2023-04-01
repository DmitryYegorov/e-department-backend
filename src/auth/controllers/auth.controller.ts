import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthRegistrationRequestDto } from "../dto/auth-registration-request.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/register")
  async register(@Body() body: AuthRegistrationRequestDto) {
    return this.service.register(body);
  }
}
