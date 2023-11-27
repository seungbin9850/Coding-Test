import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SelectionService } from "./selection.service";
import { SelectionRepository } from "./selection.repository";
import { SelectionResolver } from "./selection.resolver";
import { Selection } from "../entities/selection.entity";
import { QuestionModule } from "../question/question.module";

@Module({
    imports: [TypeOrmModule.forFeature([Selection]), QuestionModule],
    providers: [SelectionService, SelectionRepository, SelectionRepository, SelectionResolver],
})
export class SelectionModule {}
