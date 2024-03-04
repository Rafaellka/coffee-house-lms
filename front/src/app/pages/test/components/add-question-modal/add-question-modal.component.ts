import { Component, EventEmitter, inject, Output } from "@angular/core";
import { IonButton, IonContent, IonIcon, IonInput } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { addIcons } from "ionicons";
import { closeOutline } from "ionicons/icons";
import { TestRequestService } from "../../data/services/test-request.service";
import { take } from "rxjs";

@Component({
	selector: 'add-question-modal',
	templateUrl: './add-question-modal.component.html',
	standalone: true,
	styleUrls: ['./styles/add-question-modal.scss'],
	imports: [IonInput, IonContent, FormsModule, IonButton, IonIcon]
})
export class AddQuestionModalComponent {
	@Output()
	public closeModal: EventEmitter<void> = new EventEmitter<void>();

	@Output()
	public newQuestionAdd: EventEmitter<void> = new EventEmitter<void>();
	public textControlValue: string = '';
	private _testRequestService: TestRequestService = inject(TestRequestService);

	constructor() {
		addIcons({ closeOutline });
	}

	public addQuestion(): void {
		this._testRequestService.createQuestion()
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