import { InputType } from "@nestjs/graphql";
import { IsNumber, IsNotEmpty } from "class-validator";

@InputType()
export class SelectSelectionInput {
    @IsNumber()
    @IsNotEmpty()
    surveyHistoryId: number;

    @IsNumber()
    @IsNotEmpty()
    questionId: number;

    @IsNumber()
    @IsNotEmpty()
    selectionId: number;
}
