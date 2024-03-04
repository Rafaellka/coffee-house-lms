import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "../../../../custom-modules/header/header.component";
import { IonButton, IonContent, IonItem, IonLabel, IonList, IonModal } from "@ionic/angular/standalone";
import { ActivatedRoute, Router } from "@angular/router";
import { TrackRequestService } from "../../data/services/track-request.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject, Observable, take } from "rxjs";
import { LectureModel } from "../../data/models/lecture.model";
import { TestModel } from "../../data/models/test.model";
import { CommonModule } from "@angular/common";
import { addIcons } from "ionicons";
import { caretForwardOutline } from "ionicons/icons";
import { AddLectureModalComponent } from "../../components/add-lecture-modal/add-lecture-modal.component";
import { TrackModel } from "../../data/models/track.model";

@Component({
	templateUrl: './track-info.page.html',
	standalone: true,
	styleUrls: ['./styles/track-info.page.scss'],
	imports: [HeaderComponent, IonContent, IonList, IonItem, CommonModule, IonButton, IonModal, AddLectureModalComponent]
})
export class TrackInfoPage implements OnInit {
	public get track(): TrackModel {
		return this._track;
	}
	public lectureList$: Observable<LectureModel[]>;
	public testList$: Observable<TestModel[]>;
	public isAddModalOpen$: Observable<boolean>;

	public isLectureAdd: boolean = true;

	private _isAddModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	private _testList$: BehaviorSubject<TestModel[]> = new BehaviorSubject<TestModel[]>([]);
	private _lectureList$: BehaviorSubject<LectureModel[]> = new BehaviorSubject<LectureModel[]>([]);

	private _track!: TrackModel;

	private _router: Router = inject(Router);
	private _trackRequestService: TrackRequestService = inject(TrackRequestService);

	constructor() {
		this.lectureList$ = this._lectureList$.asObservable();
		this.testList$ = this._testList$.asObservable();
		this.isAddModalOpen$ = this._isAddModalOpen$.asObservable();
		addIcons({ caretForwardOutline });
	}

	public ngOnInit(): void {
		const state = this._router.getCurrentNavigation()?.extras.state;
		if (!state) {
			this._router.navigate(['tracks']);
		} else {
			this._track = state['track'];
			this.loadLectures();
			this.loadTests();
		}
	}

	public gotToLecture(lecture: LectureModel): void {
		this._router.navigate(['/lecture', lecture.id], {
			state: {
				lecture
			}
		});
	}

	public addLecture(): void {
		this._isAddModalOpen$.next(true);
		this.isLectureAdd = true;
	}

	public addTest(): void {
		this._isAddModalOpen$.next(true);
		this.isLectureAdd = false;
	}

	public closeModal(): void {
		this._isAddModalOpen$.next(false);
	}

	public loadLectures(): void {
		this._trackRequestService.getLecturesInTrack(this._track.id)
			.pipe(
				take(1)
			)
			.subscribe((lectures: LectureModel[]) => {
				this._lectureList$.next(lectures);
			});
	}

	public loadTests(): void {
		this._trackRequestService.getTestsInTrack(this._track.id)
			.pipe(
				take(1)
			)
			.subscribe((tests) => {
				this._testList$.next(tests);
			});
	}
}