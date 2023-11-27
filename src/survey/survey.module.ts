import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SurveyResolver } from "./survey.resolver";
import { SurveyService } from "./survey.service";
import { SurveyRepository } from "./survey.repository";
import { Survey } from "../entities/survey.entity";
import { Answer } from "../entities/answer.entity";
import { SurveyHistory } from "../entities/survey-history.entity";
import { Question } from "../entities/question.entity";
import { Selection } from "../entities/selection.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Survey, Answer, SurveyHistory, Question, Selection])],
    providers: [SurveyResolver, SurveyService, SurveyRepository],
    exports: [SurveyRepository],
})
export class SurveyModule {}
