import { List } from "../../../common/types/response.type";
import { ApiProperty } from "@nestjs/swagger";

class SubjectItemDto {
  @ApiProperty({ type: "string", format: "uuid" })
  readonly id: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly alias?: string | null;
  @ApiProperty({ type: "string", format: "uuid" })
  readonly teacherId: string;
  @ApiProperty()
  readonly createdAt: Date;
}

export class GetSubjectListResponseDto implements List<SubjectItemDto> {
  @ApiProperty({ type: [SubjectItemDto] })
  list: SubjectItemDto[];
}
