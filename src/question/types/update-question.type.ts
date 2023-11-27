import { InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, Length, IsNumber, IsBoolean, IsOptional } from "class-validator";

@InputType()
export class UpdateQuestionInput {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @Length(1, 100)
    title?: string;

    @IsNumber()
    @IsOptional()
    num?: number;

    @IsBoolean()
    @IsOptional()
    isRequired?: boolean;
}
