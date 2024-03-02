import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TrackModel } from "../../data/models/track.model";
import { TrackRequestService } from "../../data/services/track-request.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AsyncPipe, CommonModule } from "@angular/common";
import { IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from "../../../../custom-modules/header/header.component";
import { TrackListItemComponent } from "../../components/track-list-item/track-list-item.component";

@Component({
	templateUrl: './track-list.page.html',
	standalone: true,
	imports: [AsyncPipe, CommonModule, IonContent, HeaderComponent, TrackListItemComponent],
	styleUrls: ['./styles/track-list.page.scss']
})
export class TrackListPage implements OnInit {
	public trackList$: Observable<TrackModel[]>;
	private _trackList$: BehaviorSubject<TrackModel[]> = new BehaviorSubject<TrackModel[]>([]);
	private _trackRequestService: TrackRequestService = inject(TrackRequestService);
	private _destroyRef$: DestroyRef = inject(DestroyRef);

	constructor() {
		this.trackList$ = this._trackList$.asObservable();
	}

	public ngOnInit(): void {
		this._trackRequestService.getTrackList()
			.pipe(
				takeUntilDestroyed(this._destroyRef$)
			)
			.subscribe((list: TrackModel[]) => {
				this._trackList$.next(list);
			});
	}
}