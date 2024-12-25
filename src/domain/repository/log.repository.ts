import { LogEntity, LogSeveretyLevel } from "../entities/log.entity";

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLog(logSeveretyLevel: LogSeveretyLevel): Promise<LogEntity[]>;
}