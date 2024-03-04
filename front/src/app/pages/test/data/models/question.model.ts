import { IQuestion } from "../interfaces/question.interface";
import { AnswerModel } from "./answer.model";
import { IAnswer } from "../interfaces/answer.interface";

export class QuestionModel implements IQuestion {
	public text: string;
	public answers: AnswerModel[];
	public testId: number;
	public id: number;

	constructor(data: IQuestion) {
		this.text = data.text;
		this.answers = data.answers.map((item: IAnswer) => new AnswerModel(item));
		this.testId = data.testId;
		this.id = data.id;
	}
}