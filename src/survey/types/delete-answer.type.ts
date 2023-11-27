import { InputType } from "@nestjs/graphql";
import { IsNumber, IsNotEmpty } from "class-validator";

@InputType()
export class DeleteAnswerInput {
    @IsNumber()
    @IsNotEmpty()
    surveyHistoryId: number;

    @IsNumber()
    @IsNotEmpty()
    questionId: number;
}
