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

  private getLogFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    const stringLogs = content
      .split("\n")
      .map((log) => LogEntity.fromJson(log));

    return stringLogs;
  };

  async getLog(logSeveretyLevel: LogSeveretyLevel): Promise<LogEntity[]> {
    switch (logSeveretyLevel) {
      case LogSeveretyLevel.low:
        return this.getLogFromFile(this.allLodPath);

      case LogSeveretyLevel.medium:
        return this.getLogFromFile(this.mediumLodPath);

      case LogSeveretyLevel.high:
        return this.getLogFromFile(this.highLodPath);

      default:
        throw new Error(`${logSeveretyLevel} not implemented`);
    }
  }
}