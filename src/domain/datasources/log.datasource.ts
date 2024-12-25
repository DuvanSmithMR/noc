import { LogEntity, LogSeveretyLevel } from "../entities/log.entity";

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLog(logSeveretyLevel: LogSeveretyLevel): Promise<LogEntity[]>;
}