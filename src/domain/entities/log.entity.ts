export enum LogSeveretyLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeveretyLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeveretyLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    this.message = options.message;
    this.level = options.level;
    this.createdAt = options.createdAt ? options.createdAt : new Date();
    this.origin = options.origin;
  }

  static fromJson = (json: string) => {
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      message,
      level,
      origin,
      createdAt,
    });

    return log;
  };
}