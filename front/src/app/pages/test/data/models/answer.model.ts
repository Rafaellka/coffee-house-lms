import { IAnswer } from "../interfaces/answer.interface";

export class AnswerModel {
	public isRightAnswer: boolean;
	public text: string;
	public questionId: number;
	public id: number;

	constructor(data: IAnswer) {
		this.text = data.text;
		this.isRightAnswer = data.isrightanswer;
		this.questionId = data.questionId;
		this.id = data.id;
	}
}