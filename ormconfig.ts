import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

import { Entities } from "./src/entities";

config();

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: Entities,
    synchronize: true,
};
