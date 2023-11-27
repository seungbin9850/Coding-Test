import { InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, Length, IsNumber } from "class-validator";

@InputType()
export class CreateSelectionInput {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    num: number;

    @IsNumber()
    @IsNotEmpty()
    score: number;

    @IsNumber()
    @IsNotEmpty()
    questionId: number;
}
