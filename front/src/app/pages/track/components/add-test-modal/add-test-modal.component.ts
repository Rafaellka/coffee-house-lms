import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { IonButton, IonContent, IonIcon, IonInput, IonTextarea } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { TrackRequestService } from "../../data/services/track-request.service";
import { addIcons } from "ionicons";
import { closeOutline } from "ionicons/icons";
import { take } from "rxjs";

@Component({
	selector: 'add-test-modal',
	templateUrl: './add-test-modal.component.html',
	standalone: true,
	imports: [IonInput, IonContent, FormsModule, IonButton, IonTextarea, IonIcon],
	styleUrls: ['./styles/add-test-modal.scss']
})
export class AddTestModalComponent {
	@Input()
	public trackId!: number;

	@Output()
	public newTestAdd: EventEmitter<void> = new EventEmitter<void>();

	@Output()
	public closeModal: EventEmitter<void> = new EventEmitter<void>();

	public nameControlValue: string = '';

	private _trackRequestService: TrackRequestService = inject(TrackRequestService);

	constructor() {
		addIcons({closeOutline});
	}

	public addTest(): void {
		this._trackRequestService.addTest({
			name: this.nameControlValue,
			trackId: this.trackId,
		})
			.pipe(
				take(1)
			)
			.subscribe(() => {
				this.closeModal.next();
				this.newTestAdd.next();
			});
	}
}