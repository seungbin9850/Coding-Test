import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CreateQuestionInput } from "./types/create-question.type";
import { QuestionService } from "./question.service";
import { UpdateQuestionInput } from "./types/update-question.type";
import { DeleteQuestionInput } from "./types/delete-question.type";

@Resolver("Question")
export class QuestionResolver {
    constructor(private readonly questionService: QuestionService) {}

    @Query()
    getAllQuestions(@Args("surveyId") surveyId: number) {
        return this.questionService.getAllQuestions(surveyId);
    }

    @Mutation()
    async createQuestion(@Args("createQuestion") createQuestion: CreateQuestionInput) {
        await this.questionService.createQuestion(createQuestion);

        return true;
    }

    @Mutation()
    async updateQuestion(@Args("updateQuestion") updateQuestion: UpdateQuestionInput) {
        await this.questionService.updateQuestion(updateQuestion);

        return true;
    }

    @Mutation()
    async deleteQuestion(@Args("deleteQuestion") deleteQuestion: DeleteQuestionInput) {
        await this.questionService.deleteQuestion(deleteQuestion);

        return true;
    }
}
