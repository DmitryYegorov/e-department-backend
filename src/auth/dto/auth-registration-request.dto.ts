import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthRegistrationRequestDto {
  @IsString({ message: "Введите фамилию" })
  @ApiProperty({ type: "string", example: "Baranov" })
  readonly firstName: string;
  @IsString({message: "Введите имя"})
  @ApiProperty({ type: "string", example: "Vladislav" })
  readonly middleName: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: "string", example: "Anatolievich" })
  readonly lastName?: string;
  @IsEmail({}, { message: "Некорректный e-mail" })
  @ApiProperty({ type: "string", example: "teacher@belstu.by" })
  readonly email: string;
  @MinLength(6, { message: "Пароль должен быть длинее 6 символов" })
  @MaxLength(255, { message: "Слишком длинный пароль, Вы не запомните" })
  @ApiProperty({ type: "string", example: "A.%^2d8!!qq1e" })
  readonly password: string;
}
