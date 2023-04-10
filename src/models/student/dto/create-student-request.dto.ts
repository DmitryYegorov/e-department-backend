import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStudentRequestDto {
  @ApiProperty({
    type: "string",
    description: "Student first name",
    example: "Baranov",
  })
  @IsString()
  readonly firstName: string;
  @ApiProperty({
    type: "string",
    description: "Student middle name",
    example: "Vladislav",
  })
  @IsString()
  readonly middleName: string;
  @ApiProperty({
    type: "string",
    description: "Student first name",
    example: "Anatolievich",
  })
  @IsString()
  readonly lastName?: string | null;
  @ApiProperty({ type: "string", format: "uuid" })
  @IsString()
  readonly groupId: string;
}

export type CreateStudentServiceDto = CreateStudentRequestDto;
