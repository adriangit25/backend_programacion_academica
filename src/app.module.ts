import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { APP_INTERCEPTOR, APP_GUARD } from "@nestjs/core";
import { DatabaseModule } from "./database/database.module";
import { LoginModule } from "./login/login.module";
import { ProgramacionAcademicaModule } from "./programacion-academica/programacion-academica.module";
import { BackupModule } from "./backup/backup.module";
import { LoggerService } from "./logger/logger.service";
import { LoggerInterceptor } from "./logger/logger.interceptor";
import { JwtExtractGuard } from "./logger/jwt-extract.guard";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN") as any,
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    LoginModule,
    ProgramacionAcademicaModule,
    BackupModule,
  ],
  providers: [
    LoggerService,
    JwtExtractGuard,
    {
      provide: APP_GUARD,
      useClass: JwtExtractGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
