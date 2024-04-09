import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { TrackModel } from "../data/models/track.model";

@Injectable({
	providedIn: 'root'
})
export class TrackStateService {
	public set currentTrack(value: TrackModel) {
		this._currentTrackBhs$.next(value);
	}

	public get currentTrack(): TrackModel | null {
		return this._currentTrackBhs$.value;
	}

	public loadTracks$: Subject<void> = new Subject<void>();

	private _currentTrackBhs$: BehaviorSubject<TrackModel | null> = new BehaviorSubject<TrackModel | null>(null);
}