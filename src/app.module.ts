import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { MailModule } from "./mail/mail.module";
import { PrismaModule } from "./prisma/prisma.module";
import { I18nModule } from "nestjs-i18n";
import * as path from "path";
import { SubjectModule } from "./models/subject/subject.module";
import { GroupModule } from "./models/group/group.module";
import { StudentModule } from "./models/student/student.module";
import { ClassesModule } from "./models/classes/classes.module";
import { StatisticsModule } from "./models/statistics/statistics.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: "ru",
      loaderOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: true,
      },
    }),
    PrismaModule.register(),
    AuthModule,
    MailModule,
    SubjectModule,
    GroupModule,
    StudentModule,
    ClassesModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
