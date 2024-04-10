import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from "@angular/core";
import { BehaviorSubject, forkJoin, Observable, startWith, switchMap, take, tap } from "rxjs";
import { TrackModel } from "../../data/models/track.model";
import { TrackRequestService } from "../../data/services/track-request.service";
import { AsyncPipe, CommonModule } from "@angular/common";
import { IonButton, IonContent, IonModal } from "@ionic/angular/standalone";
import { HeaderComponent } from "../../../../custom-modules/header/header.component";
import { TrackListItemComponent } from "../../components/track-list-item/track-list-item.component";
import { AddTrackModalComponent } from "../../components/add-track-modal/add-track-modal.component";
import { USER_INFO_TOKEN } from "../../../auth/tokens/user-info.token";
import { TrackStateService } from "../../services/track-state.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UserModel } from "../../../auth/data/models/user.model";

@Component({
	templateUrl: './track-list.page.html',
	standalone: true,
	imports: [AsyncPipe, CommonModule, IonContent, HeaderComponent, TrackListItemComponent, IonButton, IonModal, AddTrackModalComponent],
	styleUrls: ['./styles/track-list.page.scss']
})
export class TrackListPage implements OnInit {
	public readonly isCreator: boolean;
	public readonly isAddTrackModalOpen$: Observable<boolean>;
	public readonly trackList$: Observable<TrackModel[]>;
	private _trackList$: BehaviorSubject<TrackModel[]> = new BehaviorSubject<TrackModel[]>([]);
	private _trackRequestService: TrackRequestService = inject(TrackRequestService);
	private _trackStateService: TrackStateService = inject(TrackStateService);
	private _isAddTrackModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private _userInfo$: BehaviorSubject<UserModel> = inject(USER_INFO_TOKEN);
	private _destroyRef: DestroyRef = inject(DestroyRef);

	constructor() {
		this.trackList$ = this._trackList$.asObservable();
		this.isAddTrackModalOpen$ = this._isAddTrackModalOpen$.asObservable();
		this.isCreator = this._userInfo$.value.isCreator;
	}

	public ngOnInit(): void {
		this._trackStateService.loadTracks$
			.pipe(
				startWith(null),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => {
				this.loadTrackList();
			});
	}

	public openModal(): void {
		this._isAddTrackModalOpen$.next(true);
	}

	public closeModal(): void {
		this._isAddTrackModalOpen$.next(false);
	}

	public loadTrackList(): void {
		forkJoin([
			this._trackRequestService.getUserPassedTracks(this._userInfo$.value.id),
			this._trackRequestService.getTrackList()
		])
			.pipe(
				take(1),
			)
			.subscribe(([passedTrackIds, tracks]) => {
				passedTrackIds.forEach((id: number) => {
					const currentTrack = tracks.find((item) => item.id === id);
					if (currentTrack) {
						currentTrack.passed = true;
					}
				});
				this._trackList$.next(tracks);
			});
	}
}