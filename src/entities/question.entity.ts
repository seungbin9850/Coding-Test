import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Survey } from "./survey.entity";
import { Selection } from "./selection.entity";
import { Answer } from "./answer.entity";

@Entity("question")
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    title: string;

    @Column()
    num: number;

    @Column({ name: "is_required", default: false })
    isRequired: boolean;

    @Column({ name: "survey_id" })
    surveyId: number;

    @ManyToOne(() => Survey, (survey) => survey.questions)
    @JoinColumn({ name: "survey_id" })
    survey: Survey;

    @OneToMany(() => Selection, (selection) => selection.question)
    selections: Selection[];

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];
}
