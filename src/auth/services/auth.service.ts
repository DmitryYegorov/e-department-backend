import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { AuthRepo } from "../repositories/auth.repo";
import { AuthRegistrationRequestDto } from "../dto/auth-registration-request.dto";
import * as bcrypt from "bcrypt";
import { WelcomeNewUserContext } from "../../mail/types/context/welcome-new-user.context";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../../mail/mail.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly authRepo: AuthRepo,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

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
          expiresIn: this.configService.getOrThrow("JWT_ACTIVATION_CODE_EXPIRES"),
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
