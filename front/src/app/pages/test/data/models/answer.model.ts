import { IAnswer } from "../interfaces/answer.interface";

export class AnswerModel implements IAnswer {
	public isRightAnswer: boolean;
	public text: string;
	public questionId: number;
	public id: number;

	constructor(data: IAnswer) {
		this.text = data.text;
		this.isRightAnswer = data.isRightAnswer;
		this.questionId = data.questionId;
		this.id = data.id;
	}
}