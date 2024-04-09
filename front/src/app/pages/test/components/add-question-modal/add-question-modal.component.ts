import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { IonButton, IonContent, IonIcon, IonInput, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { addIcons } from "ionicons";
import { closeOutline } from "ionicons/icons";
import { TestRequestService } from "../../data/services/test-request.service";
import { take } from "rxjs";
import { CommonModule } from "@angular/common";
import { IAnswer } from "../../data/interfaces/answer.interface";

@Component({
	selector: 'add-question-modal',
	templateUrl: './add-question-modal.component.html',
	standalone: true,
	styleUrls: ['./styles/add-question-modal.scss'],
	imports: [IonInput, IonContent, FormsModule, IonButton, IonIcon, IonSelect, IonSelectOption, CommonModule, ReactiveFormsModule]
})
export class AddQuestionModalComponent {
	@Input()
	public testId!: number;

	@Output()
	public closeModal: EventEmitter<void> = new EventEmitter<void>();

	@Output()
	public newQuestionAdd: EventEmitter<void> = new EventEmitter<void>();

	public fields: IAnswerField[] = [
		{
			id: 1,
			value: '',
			label: 'Введите первый вариант ответа',
			placeholder: 'Первый вариант ответа'
		},
		{
			id: 2,
			value: '',
			label: 'Введите второй вариант ответа',
			placeholder: 'Второй вариант ответа'
		},
		{
			id: 3,
			value: '',
			label: 'Введите третий вариант ответа',
			placeholder: 'Третий вариант ответа'
		},
		{
			id: 4,
			value: '',
			label: 'Введите четвертый вариант ответа',
			placeholder: 'Четвертый вариант ответа'
		}
	];

	public form: FormGroup = new FormGroup<any>( {
		text: new FormControl(''),
		rightAnswerId: new FormControl(null)
	});

	private _testRequestService: TestRequestService = inject(TestRequestService);

	constructor() {
		addIcons({ closeOutline });
		this.fields.forEach((item) => {
			this.form.addControl(item.label, new FormControl(item.value));
		})
	}

	public addQuestion(): void {
		const rightAnswerId: number = this.form.value.rightAnswerId;
		const answers: IAnswer[] = this.fields.map((answer: IAnswerField) => {
			const formValue = this.form.value[answer.label];

			return {
				id: answer.id,
				questionId: 0,
				text: formValue,
				isrightanswer: rightAnswerId === answer.id
			}
		});
		this._testRequestService.createQuestion({
			text: this.form.value.text,
			id: 0,
			testId: this.testId,
			answers
		})
			.pipe(
				take(1)
			)
			.subscribe({
				next: () => {
					this.closeModal.next();
					this.newQuestionAdd.next();
				}
			})
	}
}

interface IAnswerField {
	id: number;
	value: string;
	label: string;
	placeholder: string;
}