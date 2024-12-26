import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-case/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-case/email/send-email-logs";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource(),
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    emailService.sendEmailWithFileSystemLogs("otakudsmr@gmail.com");

    new SendEmailLogs(emailService, mongoLogRepository).execute(
      "otakudsmr@gmail.com"
    );

    CronService.createJob("*/5 * * * * *", () => {
      // const url="https://www.google.com";
      const url = "http://localhost:3000";
      new CheckService(
        mongoLogRepository,
        () => console.log(`${url} is ok.`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}