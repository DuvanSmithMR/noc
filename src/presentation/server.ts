import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-case/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("Server started...");

    const emailService = new EmailService();

    emailService.sendEmailWithFileSystemLogs("otakudsmr@gmail.com");

    CronService.createJob("*/5 * * * * *", () => {
      // const url="https://www.google.com";
      const url = "http://localhost:3000";
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok.`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}