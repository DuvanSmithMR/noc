import { LogEntity, LogSeveretyLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

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

      const log = new LogEntity(`Servce ${url} working`, LogSeveretyLevel.low);
      this.logRepository.saveLog(log);

      this.successCallback();

      return true;
    } catch (error) {
      const errorMessagge = `${url} is not ok. ${error}`;

      const log = new LogEntity(errorMessagge, LogSeveretyLevel.high);
      this.logRepository.saveLog(log);

      this.errorCallback(errorMessagge);

      return false;
    }
  }
}