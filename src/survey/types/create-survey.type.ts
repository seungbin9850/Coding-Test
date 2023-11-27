import { InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, Length } from "class-validator";

@InputType()
export class CreateSurveyInput {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    title: string;
}
