import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthRepo } from "../repositories/auth.repo";
import { AuthRegistrationRequestDto } from "../dto/auth-registration-request.dto";
import * as bcrypt from "bcrypt";
import { WelcomeNewUserContext } from "../../mail/types/context/welcome-new-user.context";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../../mail/mail.service";
import { AuthLoginRequestDto } from "../dto/auth-login-request.dto";
import { AuthLoginResponseDto } from "../dto/auth-login-response.dto";
import { ConfirmEmailDto } from "../dto/confirm-email.dto";
import { I18nContext } from "nestjs-i18n";
import { GetAuthUserResponseDto } from "../dto/get-auth-user-response.dto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly authRepo: AuthRepo,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async confirmEmail(input: ConfirmEmailDto, i18n: I18nContext): Promise<void> {
    try {
      this.logger.log(
        `Invoked method confirmEmail(): ${JSON.stringify(input)}`,
      );

      const decoded = await this.jwtService.verifyAsync(input.activationCode, {
        secret: this.configService.get("JWT_SECRET"),
      });

      const user = await this.authRepo.getUserByEmail({ email: decoded.email });

      if (!!user && user.activationCode == input.activationCode) {
        await this.authRepo.update(user.id, {
          activationCode: null,
          verifiedAt: new Date(),
        });
      } else {
        throw new BadRequestException(
          i18n.t("auth.errorMessages.confirmationError"),
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed method confirmEmail(): ${JSON.stringify({ ...input, error })}`,
      );
      throw error;
    }
  }

  async login(
    input: AuthLoginRequestDto,
    i18n: I18nContext,
  ): Promise<AuthLoginResponseDto> {
    try {
      const { email, password } = input;

      this.logger.log(
        `Invoked method login(): ${JSON.stringify({
          ...input,
          // password: null,
        })}`,
      );

      const user = await this.authRepo.getUserByEmail({ email });

      if (!user) {
        throw new NotFoundException(i18n.t("auth.errorMessages.userNotFound"));
      }

      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        throw new UnauthorizedException(
          i18n.t("auth.errorMessages.invalidCredentials"),
        );
      }

      if (user.activationCode !== null) {
        throw new UnauthorizedException("Ваш аккаунт пока не активирован.");
      }

      if (!user.isActive) {
        throw new UnauthorizedException(
          "Администратор закрыл для Вас доступ к системе",
        );
      }

      const [access, refresh] = await Promise.all([
        this.jwtService.signAsync(
          { userId: user.id },
          {
            secret: this.configService.get("JWT_ACCESS_SECRET"),
            expiresIn: this.configService.get("JWT_ACCESS_EXPIRES"),
          },
        ),
        this.jwtService.signAsync(
          { userId: user.id },
          {
            secret: this.configService.get("JWT_REFRESH_SECRET"),
            expiresIn: this.configService.get("JWT_REFRESH_EXPIRES"),
          },
        ),
      ]);

      return { access, refresh, userId: user.id, type: user.type };
    } catch (error) {
      this.logger.error(
        `Failed method login(): ${JSON.stringify({
          ...input,
          password: null,
          error,
        })}`,
      );
      throw error;
    }
  }

  async register(input: AuthRegistrationRequestDto, i18n: I18nContext) {
    try {
      this.logger.log(
        `Invoked method register(): ${JSON.stringify({
          ...input,
          password: null,
        })}`,
      );

      const exists = await this.authRepo.checkExistingEmail(input.email);

      this.logger.debug({ exists });

      if (exists) {
        throw new BadRequestException(
          i18n.t("auth.errorMessages.userAlreadyExists"),
        );
      }

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(input.password, salt);

      const activationCode = await this.jwtService.signAsync(
        { email: input.email },
        {
          secret: this.configService.getOrThrow("JWT_SECRET"),
          expiresIn: this.configService.getOrThrow(
            "JWT_ACTIVATION_CODE_EXPIRES",
          ),
        },
      );

      const entity = await this.authRepo.register({
        ...input,
        password: hashPassword,
        type: "TEACHER",
        activationCode,
      });

      const mailContext: WelcomeNewUserContext = {
        fullName: `${entity.firstName} ${entity.middleName} ${entity.lastName}`,
        activationCode,
      };
      await this.mailService
        .sendMail<WelcomeNewUserContext>(
          {
            email: entity.email,
            templateId: "welcome-new-user",
            subject: "Welcome to the E-Department!",
          },
          mailContext,
        )
        .catch((err) => {
          this.authRepo.delete(entity.id);
          throw new HttpException(
            "Прозошла ошибка на сервере при проверке Вашей электронной почты. попробуйте позже",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      return {
        firstName: entity.firstName,
        middleName: entity.middleName,
        lastName: entity.lastName,
        email: entity.email,
      };
    } catch (error) {
      this.logger.error(
        `Failed method register(): ${JSON.stringify({
          ...input,
          password: null,
          error,
        })}`,
      );
      throw error;
    }
  }

  async getAuthUserData(
    userId: string,
    i18n: I18nContext,
  ): Promise<GetAuthUserResponseDto> {
    try {
      this.logger.log(
        `Invoked method getAuthData: ${JSON.stringify({ userId })}`,
      );

      const user = await this.authRepo.getUserById(userId);

      if (!user) {
        throw new UnauthorizedException(
          i18n.t("auth.errorMessages.userNotAuth"),
        );
      }

      this.logger.log(
        `Completed method getAuthData: ${JSON.stringify({
          id: user.id,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          email: user.email,
          type: user.type,
          createdAt: user.createdAt,
        })}`,
      );

      return {
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
        createdAt: user.createdAt,
      };
    } catch (error) {
      this.logger.error(
        `Failed method getAuthUserData: ${JSON.stringify({ userId, error })}`,
      );
      throw error;
    }
  }
}
