import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-case/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-case/email/send-email-logs";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-case/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    emailService.sendEmailWithFileSystemLogs("otakudsmr@gmail.com");

    new SendEmailLogs(emailService, postgresLogRepository).execute(
      "otakudsmr@gmail.com"
    );

    CronService.createJob("*/5 * * * * *", () => {
      // const url="https://www.google.com";
      const url = "http://localhost:3000";

      new CheckService(
        fsLogRepository,
        () => console.log(`${url} is ok.`),
        (error) => console.log(error)
      ).execute(url);
    });

    CronService.createJob("*/5 * * * * *", () => {
      // const url="https://www.google.com";
      const url = "http://localhost:3000";

      new CheckServiceMultiple(
        [fsLogRepository, postgresLogRepository, mongoLogRepository],
        () => console.log(`${url} is ok.`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}