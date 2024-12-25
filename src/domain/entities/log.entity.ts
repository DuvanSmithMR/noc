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

  static fromJson = (json: string) => {
    const { message, level, createdAt } = JSON.parse(json);

    const log = new LogEntity(message, level);

    log.createdAt = new Date(createdAt);

    return log;
  };
}