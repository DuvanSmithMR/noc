import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(logSeverityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}