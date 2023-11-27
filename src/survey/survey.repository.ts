import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";

import { Survey } from "../entities/survey.entity";
import { SurveyHistory, SurveyHistoryStatus } from "../entities/survey-history.entity";
import { Answer } from "../entities/answer.entity";
import { Question } from "../entities/question.entity";

@Injectable()
export class SurveyRepository {
    constructor(private readonly connection: Connection) {}

    getAllSurveys() {
        return this.connection.getRepository(Survey).find();
    }

    getOneSurvey(id: number) {
        return this.connection.getRepository(Survey).findOne({ id });
    }

    async createSurvey(title: string) {
        await this.connection.getRepository(Survey).insert({ title });
    }

    async updateSurvey(id: number, title: string) {
        await this.connection.getRepository(Survey).update({ id }, { title });
    }

    async deleteSurvey(id: number) {
        await this.connection.getRepository(Survey).delete({ id });
    }

    createSurveyHistory(surveyId: number) {
        return this.connection.getRepository(SurveyHistory).save({ surveyId });
    }

    findSurveyHistory(surveyHistoryId: number) {
        return this.connection.getRepository(SurveyHistory).findOne({ id: surveyHistoryId, status: SurveyHistoryStatus.InProgress });
    }

    async createAnswer(surveyHistoryId: number, questionId: number, selectionId: number) {
        await this.connection.getRepository(Answer).insert({ surveyHistoryId, questionId, selectionId });
    }

    async updateAnswer(surveyHistoryId: number, questionId: number, selectionId: number) {
        await this.connection.getRepository(Answer).update({ surveyHistoryId, questionId }, { selectionId });
    }

    async deleteAnswer(surveyHistoryId: number, questionId: number) {
        await this.connection.getRepository(Answer).delete({ surveyHistoryId, questionId });
    }

    getSurveyResult(surveyHistoryId: number) {
        return this.connection
            .getRepository(Answer)
            .createQueryBuilder("answer")
            .innerJoinAndSelect("answer.question", "question")
            .innerJoinAndSelect("answer.selection", "selection")
            .where("answer.survey_history_id=:surveyHistoryId", { surveyHistoryId })
            .getMany();
    }

    getRequiredQuestions(surveyId: number) {
        return this.connection.getRepository(Question).find({ surveyId, isRequired: true });
    }

    async updateSurveyHistory(id: number, status: SurveyHistoryStatus, score: number) {
        await this.connection.getRepository(SurveyHistory).update({ id }, { status, score });
    }

    findAnswer(surveyHistoryId: number, questionId: number) {
        return this.connection.getRepository(Answer).findOne({ surveyHistoryId, questionId });
    }
}
