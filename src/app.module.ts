import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";

import { typeORMConfig } from "../ormconfig";
import { SurveyModule } from "./survey/survey.module";
import { QuestionModule } from "./question/question.module";
import { SelectionModule } from "./selection/selection.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ["./**/*.graphql"],
        }),
        SurveyModule,
        QuestionModule,
        SelectionModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
