import { IsEmail, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginRequestDto {
  @IsEmail()
  @ApiProperty({
    type: "string",
    format: "email",
    example: "teacher@belstu.by",
  })
  readonly email: string;
  @MinLength(6)
  @MaxLength(255)
  @ApiProperty({
    type: "string",
    description: "Password of the user",
    example: "A.%^2d8!!qq1e",
  })
  readonly password: string;
}
