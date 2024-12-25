import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-case/checks/check-service";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob(
        "*/5 * * * * *",
        ()=>{
            // const url="https://www.google.com";
            const url="http://localhost:3000";
            new CheckService(
                ()=>console.log(`${url} is ok.`),
                (error)=>console.log(error),
            ).execute(url);
        }
    );
  }
}