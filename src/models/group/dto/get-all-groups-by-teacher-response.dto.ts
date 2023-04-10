import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { List } from "../../../common/types/response.type";

export class GroupItemDto {
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

export class GetAllGroupsByTeacherResponseDto implements List<GroupItemDto> {
  @ApiProperty({ type: [GroupItemDto] })
  readonly list: GroupItemDto[];
}
