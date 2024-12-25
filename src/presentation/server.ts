import { CronService } from "./cron/cron-service";
import { CheckService } from "./domain/use-case/checks/check-service";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob(
        "*/5 * * * * *",
        ()=>{
            // new CheckService().execute("https://www.google.com");
            new CheckService().execute("http://localhost:3000");
        }
    );
  }
}