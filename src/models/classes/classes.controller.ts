import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ClassesService } from "./classes.service";
import { CreateClassRequestDto } from "./dto/create-class-request.dto";
import { RequestUserPayload } from "../../common/types/request.type";
import { I18n, I18nContext } from "nestjs-i18n";
import { AuthGuard } from "../../auth/guards/auth.guard";

@ApiTags("Classes")
@Controller("classes")
export class ClassesController {
  constructor(private readonly service: ClassesService) {}

  @Post()
  @ApiBody({ type: CreateClassRequestDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createNewClass(
    @Body() body: CreateClassRequestDto,
    @Request() req: RequestUserPayload,
    @I18n() i18n: I18nContext,
  ) {
    const userId = req.userId;
    return this.service.createNewClass(body, userId, i18n);
  }
}
