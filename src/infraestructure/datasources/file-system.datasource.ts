import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly lodPath = "logs/";
  private readonly allLodPath = "logs/logs-low.log";
  private readonly mediumLodPath = "logs/logs-medium.log";
  private readonly errorLodPath = "logs/logs-high.log";

  private createLogsFiles = () => {
    if (!fs.existsSync(this.lodPath)) fs.mkdirSync(this.lodPath);

    [this.allLodPath, this.mediumLodPath, this.errorLodPath].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
    });
  };

  constructor() {
    this.createLogsFiles();
  }

  saveLog(log: LogEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getLog(logSeveretyLevel: LogSeveretyLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}