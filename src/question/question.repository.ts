import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";

import { Question } from "../entities/question.entity";
import { UpdateQuestionInput } from "./types/update-question.type";

@Injectable()
export class QuestionRepository {
    constructor(private readonly connection: Connection) {}

    getOneQuestion(id: number) {
        return this.connection.getRepository(Question).findOne({ id });
    }

    getAllQuestions(surveyId: number) {
        return this.connection.getRepository(Question).find({
            where: {
                surveyId,
            },
            order: {
                num: "ASC",
                id: "ASC",
            },
        });
    }

    async createQuestion(title: string, num: number, surveyId: number, isRequired: boolean) {
        await this.connection.getRepository(Question).insert({ title, num, surveyId, isRequired });
    }

    async updateQuestion(input: UpdateQuestionInput) {
        await this.connection.getRepository(Question).update({ id: input.id }, input);
    }

    async deleteQuestion(id: number) {
        await this.connection.getRepository(Question).delete({ id });
    }
}
