import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateNewGroupRequestDto {
  @ApiProperty({
    type: "string",
    description: "Print number group in format `group-subgroup'",
    example: "12-1",
  })
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @ApiProperty()
  readonly group: number;
  @ApiProperty()
  readonly subGroup: number;
  @ApiProperty()
  readonly course: number;

  @ApiProperty({ type: "string", format: "uuid", required: false })
  readonly facultyId?: string;

  @ApiProperty()
  readonly description?: string | null;
}
