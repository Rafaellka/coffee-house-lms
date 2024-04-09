import { inject, Injectable } from "@angular/core";
import { forkJoin, map, Observable, Subject } from "rxjs";
import { TrackRequestService } from "../../track/data/services/track-request.service";
import { IUserProgress } from "../interfaces/user-progress.interface";

@Injectable({
	providedIn: 'root'
})
export class UserProgressService {
	public loadProgress$: Subject<void> = new Subject<void>();
	private _trackRequestService: TrackRequestService = inject(TrackRequestService);

	public getUserProgress(): Observable<IUserProgress> {
		return forkJoin([
			this._trackRequestService.getUserPassedTracks(),
			this._trackRequestService.getUserPassedLectures(),
			this._trackRequestService.getUserPassedTests(),
			this._trackRequestService.getTrackList(),
			this._trackRequestService.getAllLectures(),
			this._trackRequestService.getAllTests()
		])
			.pipe(
				map(([tracks, lectures, tests, allTracks, allLectures, allTests]) => ({
						tracks: tracks.map((id) => allTracks.find((track) => track.id === id)),
						lectures: lectures.map((id) => allLectures.find((lecture) => lecture.id === id)),
						tests: tests.map((id) => allTests.find((test) => test.id === id)),
						allTracks,
						allLectures,
						allTests
					})
				)
			);
	}
}