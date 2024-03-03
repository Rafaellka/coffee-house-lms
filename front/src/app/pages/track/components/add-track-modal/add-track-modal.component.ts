import { Component, DestroyRef, EventEmitter, inject, Output } from "@angular/core";
import { IonButton, IonContent, IonIcon, IonInput, IonTextarea } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { TrackRequestService } from "../../data/services/track-request.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { addIcons } from "ionicons";
import { closeOutline } from "ionicons/icons";

@Component({
	selector: 'add-track-modal',
	templateUrl: './add-track-modal.component.html',
	standalone: true,
	imports: [IonInput, IonContent, FormsModule, IonButton, IonTextarea, IonIcon],
	styleUrls: ['./styles/add-track-modal.scss']
})
export class AddTrackModalComponent {
	@Output()
	public closeModal: EventEmitter<void> = new EventEmitter<void>();

	public nameControlValue: string = '';
	public descriptionControlValue: string = '';

	private _trackRequestService: TrackRequestService = inject(TrackRequestService);
	private _destroyRef: DestroyRef = inject(DestroyRef);

	constructor() {
		addIcons({closeOutline});
	}

	public addTrack(): void {
		this._trackRequestService.addTrack({
			name: this.nameControlValue,
			description: this.descriptionControlValue
		})
			.pipe(
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => {
				this.closeModal.next();
			});
	}
}