import { IsEmail, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginRequestDto {
  @IsEmail({}, { message: "Некорректный e-mail" })
  @ApiProperty({
    type: "string",
    format: "email",
    example: "teacher@belstu.by",
  })
  readonly email: string;
  @MinLength(6, {
    message:
      "Слишком короткий пароль, он должен состоять из 6 символов и более",
  })
  @MaxLength(255, {
    message:
      "Вы ввели слишком длинный пароль, скорее всего он не подойдет, потому что мы не могли Вас зарегистрировать с таким паролем",
  })
  @ApiProperty({
    type: "string",
    description: "Password of the user",
    example: "A.%^2d8!!qq1e",
  })
  readonly password: string;
}
