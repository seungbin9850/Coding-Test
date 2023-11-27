import { utilities, WinstonModule } from "nest-winston";
import * as winstonDaily from "winston-daily-rotate-file";
import * as winston from "winston";
import * as moment from "moment-timezone";

const appendTimestamp = winston.format((info, option) => {
    if (option.tz) {
        info.timestamp = moment().tz(option.tz).format();
    }

    return info;
});

const dailyOptions = {
    level: "http",
    datePattern: "YYYY-MM-DD",
    dirname: __dirname + "/../../../logs",
    filename: "app.log.%Date%",
    maxFiles: 30,
    zippedArchive: true,
    colorize: true,
    handleException: true,
    json: false,
};

export const winstonLogger = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            level: "silly",
            format: winston.format.simple(),
        }),
        new winstonDaily(dailyOptions),
    ],
    format: winston.format.combine(
        appendTimestamp({ tz: "Asia/Seoul" }),
        winston.format.json(),
        winston.format.printf((info) => `${info.timestamp} - ${info.level} : ${info.message}`)
    ),
});
