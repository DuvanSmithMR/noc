import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  // private readonly logDatasource:LogDatasource;
  constructor(private readonly logDatasource: LogDatasource) {}

  saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }

  getLog(logSeveretyLevel: LogSeveretyLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLog(logSeveretyLevel);
  }
}