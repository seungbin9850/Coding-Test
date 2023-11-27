import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CreateSurveyInput } from "./types/create-survey.type";
import { SurveyService } from "./survey.service";
import { UpdateSurveyInput } from "./types/update-survey.type";
import { DeleteSurveyInput } from "./types/delete-survey.type";
import { StartSurveyInput } from "./types/start-survey.type";
import { SelectSelectionInput } from "./types/select-selection.type";
import { DeleteAnswerInput } from "./types/delete-answer.type";
import { CompleteSurveyInput } from "./types/complete-survey.type";

@Resolver("Survey")
export class SurveyResolver {
    constructor(private readonly surveyService: SurveyService) {}

    @Query()
    getAllSurveys() {
        return this.surveyService.getAllSurveys();
    }

    @Query()
    getOneSurvey(@Args("id") id: number) {
        return this.surveyService.getOneSurvey(id);
    }

    @Mutation()
    async createSurvey(@Args("createSurvey") createSurvey: CreateSurveyInput) {
        await this.surveyService.createSurvey(createSurvey);

        return true;
    }

    @Mutation()
    async updateSurvey(@Args("updateSurvey") updateSurvey: UpdateSurveyInput) {
        await this.surveyService.updateSurvey(updateSurvey);

        return true;
    }

    @Mutation()
    async deleteSurvey(@Args("deleteSurvey") deleteSurvey: DeleteSurveyInput) {
        await this.surveyService.deleteSurvey(deleteSurvey);

        return true;
    }

    @Mutation()
    async startSurvey(@Args("startSurvey") startSurvey: StartSurveyInput) {
        const surveyHistory = await this.surveyService.startSurvey(startSurvey);

        return surveyHistory;
    }

    @Mutation()
    async selectSelection(@Args("selectSelection") selectSelection: SelectSelectionInput) {
        await this.surveyService.selectSelection(selectSelection);

        return true;
    }

    @Mutation()
    async deleteAnswer(@Args("deleteAnswer") deleteAnswer: DeleteAnswerInput) {
        await this.surveyService.deleteAnswer(deleteAnswer);

        return true;
    }

    @Mutation()
    async completeSurvey(@Args("completeSurvey") completeSurvey: CompleteSurveyInput) {
        const surveyScore = await this.surveyService.completeSurvey(completeSurvey);

        return surveyScore;
    }

    @Query()
    getSurveyResult(@Args("id") id: number) {
        return this.surveyService.getSurveyResult(id);
    }
}
