import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
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
	private _currentTrackBhs$: BehaviorSubject<TrackModel | null> = new BehaviorSubject<TrackModel | null>(null);
}