import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Question } from "./question.entity";
import { Answer } from "./answer.entity";

@Entity("selection")
export class Selection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    title: string;

    @Column()
    num: number;

    @Column()
    score: number;

    @Column({ name: "question_id" })
    questionId: number;

    @ManyToOne(() => Question, (question) => question.selections)
    @JoinColumn({ name: "question_id" })
    question: Question;

    @OneToMany(() => Answer, (answer) => answer.selection)
    answers: Answer[];
}
