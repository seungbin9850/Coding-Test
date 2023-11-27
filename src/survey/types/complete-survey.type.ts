import { InputType } from "@nestjs/graphql";
import { IsNumber, IsNotEmpty } from "class-validator";

@InputType()
export class CompleteSurveyInput {
    @IsNumber()
    @IsNotEmpty()
    surveyHistoryId: number;
}
