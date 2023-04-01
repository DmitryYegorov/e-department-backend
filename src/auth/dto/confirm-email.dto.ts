import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ConfirmEmailDto {
  @IsString()
  @ApiProperty({
    type: "string",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRtaXRyaWkuZWdvcm93MjAxNEB5YW5kZXgucnUiLCJpYXQiOjE2ODAzNjg5NTIsImV4cCI6MTY4MDQ1NTM1Mn0.Pm8tGiPqLSOPohV8DfwAOX8AoWdnlIGi46VOVrwZTko",
  })
  activationCode: string;
}
