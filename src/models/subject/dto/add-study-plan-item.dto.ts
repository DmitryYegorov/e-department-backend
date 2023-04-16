import { ApiProperty } from "@nestjs/swagger";

export class AddStudyPlanItemDto {
  @ApiProperty({ type: "string", format: "uuid" })
  readonly subjectId: string;
  @ApiProperty()
  readonly topic: string;
  @ApiProperty()
  readonly order: number;
  @ApiProperty()
  readonly description?: string;
}
