import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Subject, take } from "rxjs";
import { LectureModel } from "../../track/data/models/lecture.model";
import { LectureRequestService } from "../data/lecture-request.service";

@Injectable({
	providedIn: 'root'
})
export class LectureStateService {
	public get lectureList(): LectureModel[] {
		return this._lectureListBhs$.value;
	}
	public set currentLecture(value: LectureModel) {
		this._currentLectureBhs$.next(value);
	}

	public get currentLecture(): LectureModel | null {
		return this._currentLectureBhs$.value;
	}

	public loadLectures$: Subject<void> = new Subject<void>();
	private _lectureListBhs$: BehaviorSubject<LectureModel[]> = new BehaviorSubject<LectureModel[]>([]);
	private _currentLectureBhs$: BehaviorSubject<LectureModel | null> = new BehaviorSubject<LectureModel | null>(null);
	private _lectureRequestService: LectureRequestService = inject(LectureRequestService);

	public setLectureList(list: LectureModel[]): void {
		this._lectureListBhs$.next(list);
	}

	public lecturePassed(lecture: LectureModel): void {
		this._lectureRequestService.lecturePassed(lecture)
			.pipe(
				take(1)
			)
			.subscribe()
	}
}