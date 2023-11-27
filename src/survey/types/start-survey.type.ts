import { InputType } from "@nestjs/graphql";
import { IsNumber, IsNotEmpty } from "class-validator";

@InputType()
export class StartSurveyInput {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
