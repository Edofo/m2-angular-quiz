import { Answer } from "./answer.type";

export interface QuizContent {
    id: string;
    question: string;
    answers: Answer[];
}
