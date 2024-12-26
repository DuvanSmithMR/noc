import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeveretyLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) throw new Error("Email log no sent");

      const log = new LogEntity({
        level: LogSeveretyLevel.low,
        message: `Log email sent`,
        origin: "send-email-logs",
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeveretyLevel.high,
        message: `${error}`,
        origin: "send-email-logs",
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }
}