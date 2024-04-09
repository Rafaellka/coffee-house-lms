import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HeaderComponent } from "../../custom-modules/header/header.component";
import { LectureModel } from "../track/data/models/lecture.model";
import { SafePipe } from "../../custom-modules/pipes/safe.pipe";
import { IonicModule } from "@ionic/angular";
import { LectureStateService } from "./services/lecture-state.service";
import { CommonModule } from "@angular/common";

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
	private _router: Router = inject(Router);
	private _lecture!: LectureModel;
	private _lectureStateService: LectureStateService = inject(LectureStateService);
	private _indexOfCurrentLecture: number;

	public ngOnInit(): void {
		this._lecture = this._lectureStateService.currentLecture;
		this._indexOfCurrentLecture = this._lectureStateService.lectureList.indexOf(this._lecture);
		this._lectureStateService.lecturePassed(this._lecture);
	}

	public goToTrack(): void {
		this._router.navigate(['tracks/track-info', this._lecture.trackId]);
	}

	public goToNextLecture(): void {
		const newCurrentLecture = this._lectureStateService.lectureList[this._indexOfCurrentLecture + 1];
		this._lectureStateService.currentLecture = newCurrentLecture;
		this._router.navigate(['lecture', newCurrentLecture.id])
	}
}