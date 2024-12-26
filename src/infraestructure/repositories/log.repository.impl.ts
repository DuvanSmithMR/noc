import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  // private readonly logDatasource:LogDatasource;
  constructor(private readonly logDatasource: LogDatasource) {}

  saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }

  getLogs(logSeverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(logSeverityLevel);
  }
}