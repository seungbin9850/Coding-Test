import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Survey } from "./survey.entity";
import { Answer } from "./answer.entity";

export enum SurveyHistoryStatus {
    InProgress = "InProgress",
    Complete = "Complete",
    Cancel = "Cancel",
}

@Entity("survey_history")
export class SurveyHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "survey_id" })
    surveyId: number;

    @Column({ default: SurveyHistoryStatus.InProgress })
    status: SurveyHistoryStatus;

    @Column({ nullable: true })
    score?: number;

    @OneToMany(() => Answer, (answer) => answer.surveyHistory)
    answers: Answer[];

    @ManyToOne(() => Survey, (survey) => survey.questions)
    @JoinColumn({ name: "survey_id" })
    survey: Survey;
}
