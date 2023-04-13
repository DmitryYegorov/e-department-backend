import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class GetAuthUserResponseDto {
  @ApiProperty({ type: "string", format: "uuid" })
  @IsString()
  readonly id: string;
  @ApiProperty()
  @IsString()
  readonly firstName: string;
  @ApiProperty()
  @IsString()
  readonly middleName: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly lastName?: string;
  @ApiProperty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsOptional()
  readonly type?: string;
  @ApiProperty()
  @IsDateString()
  readonly createdAt: Date;
}
