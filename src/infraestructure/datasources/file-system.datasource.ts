import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

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

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium)
      fs.appendFileSync(this.mediumLodPath, logAsJson);

    if (newLog.level === LogSeverityLevel.high)
      fs.appendFileSync(this.highLodPath, logAsJson);
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    if (content === "") return [];

    const logs = content.split("\n").map(LogEntity.fromJson);

    return logs;
  };

  async getLogs(logSeverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (logSeverityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLodPath);

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLodPath);

      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLodPath);

      default:
        throw new Error(`${logSeverityLevel} not implemented`);
    }
  }
}