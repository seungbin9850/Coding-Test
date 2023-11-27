import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Survey } from "../entities/survey.entity";
import { QuestionService } from "./question.service";
import { QuestionRepository } from "./question.repository";
import { QuestionResolver } from "./question.resolver";
import { Question } from "../entities/question.entity";
import { SurveyRepository } from "../survey/survey.repository";
import { SurveyModule } from "../survey/survey.module";

@Module({
    imports: [TypeOrmModule.forFeature([Survey, Question]), SurveyModule],
    providers: [QuestionService, QuestionRepository, QuestionResolver],
    exports: [QuestionRepository],
})
export class QuestionModule {}
