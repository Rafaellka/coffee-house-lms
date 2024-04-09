import { Component, inject, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, take } from "rxjs";
import { TrackModel } from "../../data/models/track.model";
import { TrackRequestService } from "../../data/services/track-request.service";
import { AsyncPipe, CommonModule } from "@angular/common";
import { IonButton, IonContent, IonModal } from "@ionic/angular/standalone";
import { HeaderComponent } from "../../../../custom-modules/header/header.component";
import { TrackListItemComponent } from "../../components/track-list-item/track-list-item.component";
import { AddTrackModalComponent } from "../../components/add-track-modal/add-track-modal.component";
import { USER_INFO_TOKEN } from "../../../auth/tokens/user-info.token";

@Component({
	templateUrl: './track-list.page.html',
	standalone: true,
	imports: [AsyncPipe, CommonModule, IonContent, HeaderComponent, TrackListItemComponent, IonButton, IonModal, AddTrackModalComponent],
	styleUrls: ['./styles/track-list.page.scss']
})
export class TrackListPage implements OnInit {
	public readonly isCreator: boolean = inject(USER_INFO_TOKEN).value.isCreator;
	public isAddTrackModalOpen$: Observable<boolean>;
	public trackList$: Observable<TrackModel[]>;
	private _trackList$: BehaviorSubject<TrackModel[]> = new BehaviorSubject<TrackModel[]>([]);
	private _trackRequestService: TrackRequestService = inject(TrackRequestService);
	private _isAddTrackModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor() {
		this.trackList$ = this._trackList$.asObservable();
		this.isAddTrackModalOpen$ = this._isAddTrackModalOpen$.asObservable();
	}

	public ngOnInit(): void {
		this.loadTrackList();
		this.loadUserPassedTracks();
	}

	public openModal(): void {
		this._isAddTrackModalOpen$.next(true);
	}

	public closeModal(): void {
		this._isAddTrackModalOpen$.next(false);
	}

	public loadTrackList(): void {
		this._trackRequestService.getTrackList()
			.pipe(
				take(1)
			)
			.subscribe((list: TrackModel[]) => {
				this._trackList$.next(list);
			});
	}

	public loadUserPassedTracks(): void {
		this._trackRequestService.getUserPassedTracks()
			.pipe(
				take(1)
			)
			.subscribe(() => {});
	}
}