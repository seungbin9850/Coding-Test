import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class DeleteQuestionInput {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
