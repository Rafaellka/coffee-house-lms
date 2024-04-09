import { AnswerModel } from "../data/models/answer.model";
import { QuestionModel } from "../data/models/question.model";

export interface IResultItem {
	question: QuestionModel;
	answer?: AnswerModel;
}