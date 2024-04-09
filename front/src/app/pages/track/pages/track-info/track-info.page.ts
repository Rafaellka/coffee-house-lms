import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "../../../../custom-modules/header/header.component";
import { IonButton, IonContent, IonItem, IonLabel, IonList, IonModal } from "@ionic/angular/standalone";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { TrackRequestService } from "../../data/services/track-request.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject, filter, Observable, startWith, switchMap, take, tap } from "rxjs";
import { LectureModel } from "../../data/models/lecture.model";
import { TestModel } from "../../data/models/test.model";
import { CommonModule } from "@angular/common";
import { addIcons } from "ionicons";
import { caretForwardOutline } from "ionicons/icons";
import { AddLectureModalComponent } from "../../components/add-lecture-modal/add-lecture-modal.component";
import { TrackModel } from "../../data/models/track.model";
import { AddTestModalComponent } from "../../components/add-test-modal/add-test-modal.component";
import { WithModalComponent } from "../../../../custom-modules/modal/with-modal.component";
import { TestStateService } from "../../../test/services/test-state.service";
import { LectureStateService } from "../../../lecture/services/lecture-state.service";
import { TrackStateService } from "../../services/track-state.service";
import { USER_INFO_TOKEN } from "../../../auth/tokens/user-info.token";

@Component({
	templateUrl: './track-info.page.html',
	standalone: true,
	styleUrls: ['./styles/track-info.page.scss'],
	imports: [HeaderComponent, IonContent, IonList, IonItem, CommonModule, IonButton, IonModal, AddLectureModalComponent, AddTestModalComponent]
})
export class TrackInfoPage extends WithModalComponent implements OnInit {
	public get track(): TrackModel {
		return this._track;
	}
	public readonly isCreator: boolean = inject(USER_INFO_TOKEN).value.isCreator;

	public lectureList$: Observable<LectureModel[]>;
	public testList$: Observable<TestModel[]>;

	public isLectureAdd: boolean = true;

	private _testList$: BehaviorSubject<TestModel[]> = new BehaviorSubject<TestModel[]>([]);
	private _lectureList$: BehaviorSubject<LectureModel[]> = new BehaviorSubject<LectureModel[]>([]);

	private _track!: TrackModel;

	private _router: Router = inject(Router);
	private _trackRequestService: TrackRequestService = inject(TrackRequestService);
	private _testStateService: TestStateService = inject(TestStateService);
	private _lectureStateService: LectureStateService = inject(LectureStateService);
	private _trackStateService: TrackStateService = inject(TrackStateService);
	private _destroyRef: DestroyRef = inject(DestroyRef);

	constructor() {
		super();
		this.lectureList$ = this._lectureList$.asObservable();
		this.testList$ = this._testList$.asObservable();
		addIcons({ caretForwardOutline });
	}

	public ngOnInit(): void {
		this._track = this._trackStateService.currentTrack;
		this._lectureStateService.loadLectures$
			.pipe(
				startWith(null),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => {
				this.loadLectures();
			});
		this._testStateService.loadTests$
			.pipe(
				startWith(null),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => {
				this.loadTests();
			})
	}

	public gotToLecture(lecture: LectureModel, index: number): void {
		this._lectureStateService.currentLecture = lecture;
		this._router.navigate(['/lecture', lecture.id]);
	}

	public goToTest(test: TestModel): void {
		this._testStateService.currentTest = test;
		this._router.navigate(['/test', test.id]);
	}

	public addLecture(): void {
		this.openModal();
		this.isLectureAdd = true;
	}

	public addTest(): void {
		this.openModal();
		this.isLectureAdd = false;
	}

	public loadLectures(): void {
		this._trackRequestService.getLecturesInTrack(this._track.id)
			.pipe(
				take(1),
				tap((lectures: LectureModel[]) => {
					this._lectureList$.next(lectures);
					this._lectureStateService.setLectureList(lectures);
				}),
				switchMap(() => this._trackRequestService.getUserPassedLectures())
			)
			.subscribe((passedLectureIds: number[]) => {
				passedLectureIds.forEach((lectureId: number) => {
					this._lectureList$.value.find((lecture: LectureModel) => lecture.id === lectureId).passed = true;
				});
			});
	}

	public loadTests(): void {
		this._trackRequestService.getTestsInTrack(this._track.id)
			.pipe(
				take(1),
				tap((tests) => {
					this._testList$.next(tests);
				}),
				switchMap(() => this._trackRequestService.getUserPassedTests())
			)
			.subscribe((passedTestIds: number[]) => {
				passedTestIds.forEach((testId: number) => {
					this._testList$.value.find((test: TestModel) => test.id === testId).passed = true;
				})
			});
	}
}