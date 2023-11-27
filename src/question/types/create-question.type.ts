import { InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, Length, IsNumber, IsBoolean } from "class-validator";

@InputType()
export class CreateQuestionInput {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    num: number;

    @IsNumber()
    @IsNotEmpty()
    surveyId: number;

    @IsBoolean()
    isRequired?: boolean;
}
