import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthRegistrationRequestDto } from "../dto/auth-registration-request.dto";
import { AuthLoginRequestDto } from "../dto/auth-login-request.dto";
import { I18n, I18nContext } from "nestjs-i18n";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthLoginResponseDto } from "../dto/auth-login-response.dto";
import { ConfirmEmailDto } from "../dto/confirm-email.dto";
import { GetAuthUserResponseDto } from "../dto/get-auth-user-response.dto";
import { AuthGuard } from "../guards/auth.guard";
import { RequestUserPayload } from "../../common/types/request.type";

@ApiTags("Authorization")
@Controller("/auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/register")
  @ApiBody({ type: AuthRegistrationRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async register(
    @Body() body: AuthRegistrationRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.service.register(body, i18n);
  }

  @Post("/login/email")
  @ApiBody({ type: AuthLoginRequestDto })
  @ApiResponse({ type: AuthLoginResponseDto, status: HttpStatus.CREATED })
  async loginEmail(
    @Body() body: AuthLoginRequestDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.service.login(body, i18n);
  }

  @Post("/confirm-email")
  @ApiBody({ type: ConfirmEmailDto })
  @ApiResponse({ status: HttpStatus.CREATED })
  async confirmEmail(@Body() body, @I18n() i18n: I18nContext) {
    return this.service.confirmEmail(body, i18n);
  }

  @Get("/user")
  @ApiResponse({ type: GetAuthUserResponseDto, status: HttpStatus.OK })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getAuthUserData(
    @Request() req: RequestUserPayload,
    @I18n() i18n: I18nContext,
  ) {
    const userId = req.userId;
    return this.service.getAuthUserData(userId, i18n);
  }
}
