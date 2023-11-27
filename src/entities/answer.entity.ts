import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Question } from "./question.entity";
import { SurveyHistory } from "./survey-history.entity";
import { Selection } from "./selection.entity";

@Entity("answer")
export class Answer {
    @PrimaryColumn({ name: "survey_history_id" })
    surveyHistoryId: number;

    @PrimaryColumn({ name: "question_id" })
    questionId: number;

    @Column({ name: "selection_id" })
    selectionId: number;

    @ManyToOne(() => SurveyHistory, (surveyHistory) => surveyHistory.answers)
    @JoinColumn({ name: "survey_id" })
    surveyHistory: SurveyHistory;

    @ManyToOne(() => Question, (question) => question.answers)
    @JoinColumn({ name: "question_id" })
    question: Question;

    @ManyToOne(() => Selection, (selection) => selection.answers)
    @JoinColumn({ name: "selection_id" })
    selection: Selection;
}
