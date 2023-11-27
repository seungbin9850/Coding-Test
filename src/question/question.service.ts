import { Injectable, NotFoundException } from "@nestjs/common";

import { QuestionRepository } from "./question.repository";
import { CreateQuestionInput } from "./types/create-question.type";
import { UpdateQuestionInput } from "./types/update-question.type";
import { DeleteQuestionInput } from "./types/delete-question.type";
import { SurveyRepository } from "../survey/survey.repository";

@Injectable()
export class QuestionService {
    constructor(private readonly questionRepository: QuestionRepository, private readonly surveyRepository: SurveyRepository) {}

    async getAllQuestions(surveyId: number) {
        const survey = await this.checkExistSurvey(surveyId);

        return this.questionRepository.getAllQuestions(survey.id);
    }

    async createQuestion({ title, num, surveyId, isRequired }: CreateQuestionInput) {
        const survey = await this.checkExistSurvey(surveyId);

        await this.questionRepository.createQuestion(title, num, survey.id, isRequired);
    }

    async updateQuestion(input: UpdateQuestionInput) {
        await this.checkExistQuestion(input.id);

        await this.questionRepository.updateQuestion(input);
    }

    async deleteQuestion({ id }: DeleteQuestionInput) {
        await this.checkExistQuestion(id);

        await this.questionRepository.deleteQuestion(id);
    }

    private async checkExistSurvey(id: number) {
        const survey = await this.surveyRepository.getOneSurvey(id);

        if (!survey) throw new NotFoundException("Survey Not Found");

        return survey;
    }

    private async checkExistQuestion(id: number) {
        const question = await this.questionRepository.getOneQuestion(id);

        if (!question) throw new NotFoundException("Question Not Found");
    }
}
