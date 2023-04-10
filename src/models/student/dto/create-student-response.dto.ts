import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsString } from "class-validator";

export class CreateStudentResponseDto {
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
  readonly lastName?: string;
  @ApiProperty({ type: "string", format: "uuid" })
  @IsString()
  readonly groupId: string;
  @ApiProperty()
  @IsBoolean()
  readonly isActive: boolean;
  @ApiProperty()
  @IsDateString()
  readonly createdAt: Date;
}
