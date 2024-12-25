export enum LogSeveretyLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeveretyLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeveretyLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }
}