import {
  BadRequestException,
  Injectable,
  Logger,
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

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly authRepo: AuthRepo,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async confirmEmail(input: ConfirmEmailDto): Promise<void> {
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
          "User not found or activation code expired",
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed method confirmEmail(): ${JSON.stringify({ ...input, error })}`,
      );
      throw error;
    }
  }

  async login(input: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    try {
      const { email, password } = input;

      this.logger.log(
        `Invoked method login(): ${JSON.stringify({
          ...input,
          password: null,
        })}`,
      );

      const user = await this.authRepo.getUserByEmail({ email });

      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches || user.activationCode) {
        throw new UnauthorizedException("Invalid credentials");
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

      return { access, refresh, userId: user.id };
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

  async register(input: AuthRegistrationRequestDto) {
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
        throw new BadRequestException("User already exists with that email");
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
      await this.mailService.sendMail<WelcomeNewUserContext>(
        {
          email: entity.email,
          templateId: "welcome-new-user",
          subject: "Welcome to the E-Department!",
        },
        mailContext,
      );
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
}
