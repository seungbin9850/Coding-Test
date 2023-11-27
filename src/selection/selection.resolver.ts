import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CreateSelectionInput } from "./types/create-selection.type";
import { SelectionService } from "./selection.service";
import { UpdateSelectionInput } from "./types/update-selection.type";
import { DeleteSelectionInput } from "./types/delete-selection.type";

@Resolver("Selection")
export class SelectionResolver {
    constructor(private readonly selectionService: SelectionService) {}

    @Query()
    getAllSelections(@Args("questionId") questionId: number) {
        return this.selectionService.getAllSelections(questionId);
    }

    @Mutation()
    async createSelection(@Args("createSelection") createSelection: CreateSelectionInput) {
        await this.selectionService.createSelection(createSelection);

        return true;
    }

    @Mutation()
    async updateSelection(@Args("updateSelection") updateSelection: UpdateSelectionInput) {
        await this.selectionService.updateSelection(updateSelection);

        return true;
    }

    @Mutation()
    async deleteSelection(@Args("deleteSelection") deleteSelection: DeleteSelectionInput) {
        await this.selectionService.deleteSelection(deleteSelection);

        return true;
    }
}
