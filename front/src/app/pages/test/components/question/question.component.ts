import { Component, Input } from "@angular/core";
import { QuestionModel } from "../../data/models/question.model";
import { CommonModule } from "@angular/common";
import { IonRadio, IonRadioGroup } from "@ionic/angular/standalone";

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
}