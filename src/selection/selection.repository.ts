import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";

import { Selection } from "../entities/selection.entity";
import { UpdateSelectionInput } from "./types/update-selection.type";

@Injectable()
export class SelectionRepository {
    constructor(private readonly connection: Connection) {}

    getOneSelection(id: number) {
        return this.connection.getRepository(Selection).findOne({ id });
    }

    getAllSelections(questionId: number) {
        return this.connection.getRepository(Selection).find({
            where: {
                questionId,
            },
            order: {
                num: "ASC",
                id: "ASC",
            },
        });
    }

    async createSelection(questionId: number, title: string, num: number, score: number) {
        await this.connection.getRepository(Selection).insert({ questionId, title, num, score });
    }

    async updateSelection(input: UpdateSelectionInput) {
        await this.connection.getRepository(Selection).update({ id: input.id }, input);
    }

    async deleteSelection(id: number) {
        await this.connection.getRepository(Selection).delete({ id });
    }
}
