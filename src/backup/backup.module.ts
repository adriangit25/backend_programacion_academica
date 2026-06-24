import { Module } from "@nestjs/common";
import { BackupService } from "./backup.service";
import { BackupController } from "./backup.controller";
import { LoggerService } from "../logger/logger.service";

@Module({
  controllers: [BackupController],
  providers: [BackupService, LoggerService],
  exports: [BackupService],
})
export class BackupModule {}
