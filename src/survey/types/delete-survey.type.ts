import { InputType } from "@nestjs/graphql";
import { IsNumber, IsNotEmpty } from "class-validator";

@InputType()
export class DeleteSurveyInput {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
