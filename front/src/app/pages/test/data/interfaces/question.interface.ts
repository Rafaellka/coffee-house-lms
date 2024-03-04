import { IAnswer } from "./answer.interface";

export interface IQuestion {
	text: string;
	answers: IAnswer[];
	testId: number;
	id: number;

}