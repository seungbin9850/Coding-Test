import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class DeleteSelectionInput {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
