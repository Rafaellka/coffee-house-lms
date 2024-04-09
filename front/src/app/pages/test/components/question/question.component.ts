import { Component, EventEmitter, Input, Output } from "@angular/core";
import { QuestionModel } from "../../data/models/question.model";
import { CommonModule } from "@angular/common";
import { IonRadio, IonRadioGroup } from "@ionic/angular/standalone";

import { AnswerModel } from "../../data/models/answer.model";

@Component({
	selector: 'question',
	templateUrl: './question.component.html',
	standalone: true,
	styleUrls: ['./styles/question.scss'],
	imports: [CommonModule, IonRadio, IonRadioGroup]
})
export class QuestionComponent {
	@Input()
	public model!: QuestionModel;

	@Output()
	public valueChange: EventEmitter<AnswerModel> = new EventEmitter<AnswerModel>();
	public currentValue!: AnswerModel;

	public selectItem(answer: AnswerModel): void {
		this.currentValue = answer;
		this.valueChange.next(this.currentValue);
	}
}