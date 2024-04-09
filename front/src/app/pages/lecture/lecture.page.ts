import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HeaderComponent } from "../../custom-modules/header/header.component";
import { LectureModel } from "../track/data/models/lecture.model";
import { SafePipe } from "../../custom-modules/pipes/safe.pipe";
import { IonicModule } from "@ionic/angular";
import { LectureStateService } from "./services/lecture-state.service";
import { CommonModule } from "@angular/common";
import { take } from "rxjs";
import { LectureRequestService } from "./data/lecture-request.service";
import { UserModel } from "../auth/data/models/user.model";
import { USER_INFO_TOKEN } from "../auth/tokens/user-info.token";

@Component({
	templateUrl: './lecture.page.html',
	standalone: true,
	imports: [HeaderComponent, SafePipe, IonicModule, CommonModule],
	styleUrls: ['./styles/lecture.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturePage implements OnInit {
	public get lecture(): LectureModel {
		return this._lecture;
	}

	public get isLastLecture(): boolean {
		return this._indexOfCurrentLecture === this._lectureStateService.lectureList.length - 1;
	}

	public readonly isCreator: boolean = inject(USER_INFO_TOKEN).value.isCreator;
	private _router: Router = inject(Router);
	private _lecture!: LectureModel;
	private _lectureStateService: LectureStateService = inject(LectureStateService);
	private _lectureRequestService: LectureRequestService = inject(LectureRequestService);
	private _indexOfCurrentLecture: number;

	public ngOnInit(): void {
		this._lecture = this._lectureStateService.currentLecture;
		this._indexOfCurrentLecture = this._lectureStateService.lectureList.indexOf(this._lecture);
		if (!this.isCreator) {
			this._lectureStateService.lecturePassed(this._lecture);
		}
	}

	public goToTrack(): void {
		this._lectureStateService.loadLectures$.next();
		this._router.navigate(['tracks/track-info', this._lecture.trackId]);
	}

	public goToNextLecture(): void {
		const newCurrentLecture = this._lectureStateService.lectureList[this._indexOfCurrentLecture + 1];
		this._lectureStateService.currentLecture = newCurrentLecture;
		this._router.navigate(['lecture', newCurrentLecture.id])
	}

	public deleteLecture(): void {
		this._lectureRequestService.deleteLecture(this._lecture)
			.pipe(
				take(1)
			)
			.subscribe(() => {
				this._lectureStateService.loadLectures$.next();
				this._router.navigate(['tracks/track-info', this._lecture.trackId])
			});
	}
}