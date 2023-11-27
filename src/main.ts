import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./exception/exception.filter";
import { winstonLogger } from "./log/winston.config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useLogger(winstonLogger);

    await app.listen(4000);
}

bootstrap();
