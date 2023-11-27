import { InputType } from "@nestjs/graphql";
import { IsNumber, IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class UpdateSurveyInput {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    title: string;
}
