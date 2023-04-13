import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateClassRequestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  @IsString()
  readonly subjectId: string;
  @ApiProperty({ type: "string", format: "uuid" })
  @IsString()
  readonly groupId: string;
}
