import { ApiProperty } from "@nestjs/swagger";

export class CreateFacultyDto {
  @ApiProperty()
  readonly id?: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly shortName: string;
}
