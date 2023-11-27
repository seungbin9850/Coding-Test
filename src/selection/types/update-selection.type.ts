import { IsNumber, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateSelectionInput {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @Length(1, 100)
    title?: string;

    @IsNumber()
    score?: number;
}
