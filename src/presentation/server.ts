import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob(
        "*/5 * * * * *",
        ()=>{
            const date = new Date();
            console.log("first 5", date);
        }
    );

    CronService.createJob(
        "*/2 * * * * *",
        ()=>{
            const date = new Date();
            console.log("first 2", date);
        }
    );
  }
}