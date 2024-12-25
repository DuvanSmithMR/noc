import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly lodPath = "logs/";
  private readonly allLodPath = "logs/logs-all.log";
  private readonly mediumLodPath = "logs/logs-medium.log";
  private readonly highLodPath = "logs/logs-high.log";

  private createLogsFiles = () => {
    if (!fs.existsSync(this.lodPath)) fs.mkdirSync(this.lodPath);

    [this.allLodPath, this.mediumLodPath, this.highLodPath].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
    });
  };

  constructor() {
    this.createLogsFiles();
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;
    
    fs.appendFileSync(this.allLodPath, logAsJson);

    if (newLog.level === LogSeveretyLevel.low) return;

    if (newLog.level === LogSeveretyLevel.medium)
      fs.appendFileSync(this.mediumLodPath, logAsJson);

    if (newLog.level === LogSeveretyLevel.high)
      fs.appendFileSync(this.highLodPath, logAsJson);
  }

  getLog(logSeveretyLevel: LogSeveretyLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}