import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateNewGroupResponseDto {
  @ApiProperty({ type: "string", format: "uuid" })
  @IsString()
  readonly id: string;
  @ApiProperty({ type: "string", example: "12-1" })
  @IsString()
  readonly name: string;
  @ApiProperty()
  readonly isActive: boolean;
  @ApiProperty({ type: "string", format: "uuid" })
  @IsString()
  readonly teacherId: string;
  @ApiProperty()
  readonly createdAt: Date;
}
