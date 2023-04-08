import { IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNewSubjectRequestDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: "Subject name",
    example: "Design and computers systems",
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @MaxLength(125)
  @ApiProperty({ description: "Short subject name", example: "DCS" })
  readonly alias?: string | null;
}

export type CreateNewSubject = CreateNewSubjectRequestDto & {
  teacherId: string;
};
