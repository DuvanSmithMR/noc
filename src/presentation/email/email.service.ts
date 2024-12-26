import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

const nameService: string = "email.service.ts";

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      const log = new LogEntity({
        level: LogSeveretyLevel.low,
        message: "Email send",
        origin: nameService,
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeveretyLevel.high,
        message: "Email not send",
        origin: nameService,
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
        <h3> Logs del sistema </h3>
        <p> Algo </p>
        <p> Ver logs adjuntos </p>
      `;
    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}