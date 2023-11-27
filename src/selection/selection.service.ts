import { Injectable, NotFoundException } from "@nestjs/common";

import { SelectionRepository } from "./selection.repository";
import { CreateSelectionInput } from "./types/create-selection.type";
import { QuestionRepository } from "../question/question.repository";
import { UpdateSelectionInput } from "./types/update-selection.type";
import { DeleteSelectionInput } from "./types/delete-selection.type";

@Injectable()
export class SelectionService {
    constructor(private readonly selectionRepository: SelectionRepository, private readonly questionRepository: QuestionRepository) {}

    async getAllSelections(questionId: number) {
        const question = await this.questionRepository.getOneQuestion(questionId);

        if (!question) throw new NotFoundException("Question Not Found");

        return this.selectionRepository.getAllSelections(question.id);
    }

    async createSelection({ questionId, title, num, score }: CreateSelectionInput) {
        const question = await this.checkExistQuestion(questionId);

        await this.selectionRepository.createSelection(question.id, title, num, score);
    }

    async updateSelection(input: UpdateSelectionInput) {
        await this.checkExistSelection(input.id);

        await this.selectionRepository.updateSelection(input);
    }

    async deleteSelection({ id }: DeleteSelectionInput) {
        await this.checkExistSelection(id);

        await this.selectionRepository.deleteSelection(id);
    }

    private async checkExistQuestion(id: number) {
        const question = await this.questionRepository.getOneQuestion(id);

        if (!question) throw new NotFoundException("Question Not Found");

        return question;
    }

    private async checkExistSelection(id: number) {
        const selection = await this.selectionRepository.getOneSelection(id);

        if (!selection) throw new NotFoundException("Selection Not Found");
    }
}
