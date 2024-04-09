import { inject, Injectable } from "@angular/core";
import { forkJoin, map, Observable } from "rxjs";
import { TrackRequestService } from "../../track/data/services/track-request.service";
import { LectureRequestService } from "../../lecture/data/lecture-request.service";
import { TestRequestService } from "../../test/data/services/test-request.service";
import { IUserProgress } from "../interfaces/user-progress.interface";

@Injectable({
	providedIn: 'root'
})
export class UserProgressService {
	private _trackRequestService: TrackRequestService = inject(TrackRequestService);

	public getUserProgress(): Observable<IUserProgress> {
		return forkJoin([
			this._trackRequestService.getUserPassedTracks(),
			this._trackRequestService.getUserPassedLectures(),
			this._trackRequestService.getUserPassedTests(),
		])
			.pipe(
				map(([tracks, lectures, tests]) => ({
						tracks,
						lectures,
						tests
					})
				)
			);
	}
}