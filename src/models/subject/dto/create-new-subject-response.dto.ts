import { ApiProperty } from "@nestjs/swagger";

export class CreateNewSubjectResponseDto {
  @ApiProperty({ type: "string", format: "uuid" }) readonly id: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly alias?: string | null;
  @ApiProperty({ type: "string", format: "uuid" })
  readonly teacherId: string;
  @ApiProperty()
  readonly createdAt: Date;
}
