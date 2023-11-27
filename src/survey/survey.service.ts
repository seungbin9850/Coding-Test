import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";

import { SurveyRepository } from "./survey.repository";
import { CreateSurveyInput } from "./types/create-survey.type";
import { UpdateSurveyInput } from "./types/update-survey.type";
import { DeleteSurveyInput } from "./types/delete-survey.type";
import { StartSurveyInput } from "./types/start-survey.type";
import { SelectSelectionInput } from "./types/select-selection.type";
import { DeleteAnswerInput } from "./types/delete-answer.type";
import { CompleteSurveyInput } from "./types/complete-survey.type";
import { SurveyHistoryStatus } from "../entities/survey-history.entity";

@Injectable()
export class SurveyService {
    constructor(private readonly surveyRepository: SurveyRepository) {}

    getAllSurveys() {
        return this.surveyRepository.getAllSurveys();
    }

    async getOneSurvey(id: number) {
        const survey = await this.checkExistSurvey(id);

        return survey;
    }

    async createSurvey({ title }: CreateSurveyInput) {
        await this.surveyRepository.createSurvey(title);
    }

    async updateSurvey({ id, title }: UpdateSurveyInput) {
        const survey = await this.checkExistSurvey(id);

        await this.surveyRepository.updateSurvey(survey.id, title);
    }

    async deleteSurvey({ id }: DeleteSurveyInput) {
        const survey = await this.checkExistSurvey(id);

        await this.surveyRepository.deleteSurvey(survey.id);
    }

    async startSurvey({ id }: StartSurveyInput) {
        const survey = await this.checkExistSurvey(id);
        const surveyHistory = await this.surveyRepository.createSurveyHistory(survey.id);

        return surveyHistory;
    }

    async selectSelection({ surveyHistoryId, questionId, selectionId }: SelectSelectionInput) {
        const surveyHistory = await this.checkIsInProgressSurvey(surveyHistoryId);

        const answer = await this.surveyRepository.findAnswer(surveyHistory.id, questionId);

        if (answer) await this.surveyRepository.updateAnswer(surveyHistory.id, questionId, selectionId);
        else await this.surveyRepository.createAnswer(surveyHistory.id, questionId, selectionId);
    }

    async deleteAnswer({ surveyHistoryId, questionId }: DeleteAnswerInput) {
        const answer = await this.surveyRepository.findAnswer(surveyHistoryId, questionId);

        if (!answer) throw new NotFoundException("Answer Not Found");

        await this.surveyRepository.deleteAnswer(answer.surveyHistoryId, answer.questionId);
    }

    async completeSurvey({ surveyHistoryId }: CompleteSurveyInput) {
        const answers = await this.surveyRepository.getSurveyResult(surveyHistoryId);

        const surveyHistory = await this.surveyRepository.findSurveyHistory(surveyHistoryId);

        // 1. 필수문항을 전부 가져옴
        const requiredQuestions = await this.surveyRepository.getRequiredQuestions(surveyHistory.surveyId);

        // 2. 답한 모든 질문의 id를 가져옴
        const answeredQuestionIds = answers.map(({ question }) => question.id);

        // 3. 필수문항 중 답하지 않은 질문들을 찾음
        const unansweredRequiredQuestions = requiredQuestions.filter(({ id }) => !answeredQuestionIds.includes(id));

        // 4. 3에서 나온 결과가 한개라도 있다면 에러
        if (unansweredRequiredQuestions.length) throw new BadRequestException("Not Enter All Required Questions");

        const score = answers.reduce((sum, currentAnswer) => (sum += currentAnswer.selection.score), 0);

        await this.surveyRepository.updateSurveyHistory(surveyHistoryId, SurveyHistoryStatus.Complete, score);

        return score;
    }

    private async checkExistSurvey(id: number) {
        const survey = await this.surveyRepository.getOneSurvey(id);

        if (!survey) throw new NotFoundException("Survey Not Found");

        return survey;
    }

    private async checkIsInProgressSurvey(id: number) {
        const surveyHistory = await this.surveyRepository.findSurveyHistory(id);

        if (!surveyHistory) throw new NotFoundException("Survey Is Not In Progress");

        return surveyHistory;
    }
}
