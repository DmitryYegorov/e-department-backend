import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginResponseDto {
  @ApiProperty({ description: "Access token string" })
  readonly access: string;
  @ApiProperty({ description: "Refresh token string" })
  readonly refresh: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "Identifier of authorized user",
  })
  readonly userId: string;

  @ApiProperty()
  readonly type: string;
}
