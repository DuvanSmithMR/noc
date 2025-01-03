import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

const nameService: string = "check-service.ts";

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) throw new Error(`Error on check service ${url}`);

      const log = new LogEntity({
        message: `Servce ${url} working`,
        level: LogSeverityLevel.low,
        origin: nameService,
      });
      this.logRepository.saveLog(log);

      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMessagge = `${url} is not ok. ${error}`;

      const log = new LogEntity({
        message: errorMessagge,
        level: LogSeverityLevel.high,
        origin: nameService,
      });
      this.logRepository.saveLog(log);

      this.errorCallback && this.errorCallback(errorMessagge);

      return false;
    }
  }
}