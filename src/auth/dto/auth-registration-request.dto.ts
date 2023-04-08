import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthRegistrationRequestDto {
  @IsString()
  @ApiProperty({ type: "string", example: "Baranov" })
  readonly firstName: string;
  @IsString()
  @ApiProperty({ type: "string", example: "Vladislav" })
  readonly middleName: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: "string", example: "Anatolievich" })
  readonly lastName?: string;
  @IsEmail()
  @ApiProperty({ type: "string", example: "teacher@belstu.by" })
  readonly email: string;
  @MinLength(6)
  @MaxLength(255)
  @ApiProperty({ type: "string", example: "A.%^2d8!!qq1e" })
  readonly password: string;
}
