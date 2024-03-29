import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { IonButton, IonContent, IonIcon, IonInput, IonTextarea } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { TrackRequestService } from "../../data/services/track-request.service";
import { addIcons } from "ionicons";
import { closeOutline } from "ionicons/icons";
import { take } from "rxjs";

@Component({
	selector: 'add-lecture-modal',
	templateUrl: './add-lecture-modal.component.html',
	standalone: true,
	imports: [IonInput, IonContent, FormsModule, IonButton, IonTextarea, IonIcon],
	styleUrls: ['./styles/add-lecture-modal.scss']
})
export class AddLectureModalComponent {
	@Input()
	public trackId!: number;

	@Output()
	public newLectureAdd: EventEmitter<void> = new EventEmitter<void>();

	@Output()
	public closeModal: EventEmitter<void> = new EventEmitter<void>();

	public nameControlValue: string = '';
	public videoUrlControlValue: string = '';
	public textControlValue: string = '';

	private _trackRequestService: TrackRequestService = inject(TrackRequestService);

	constructor() {
		addIcons({closeOutline});
	}

	public addLecture(): void {
		this._trackRequestService.addLecture({
			name: this.nameControlValue,
			videoUrl: this.videoUrlControlValue,
			trackId: this.trackId,
			text: this.textControlValue
		})
			.pipe(
				take(1)
			)
			.subscribe(() => {
				this.closeModal.next();
				this.newLectureAdd.next();
			});
	}
}