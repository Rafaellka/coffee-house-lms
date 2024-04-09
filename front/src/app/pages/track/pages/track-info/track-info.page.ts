import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "../../../../custom-modules/header/header.component";
import { IonButton, IonContent, IonItem, IonList, IonModal } from "@ionic/angular/standalone";
import { Router } from "@angular/router";
import { TrackRequestService } from "../../data/services/track-request.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject, forkJoin, Observable, startWith, Subject, switchMap, take, tap } from "rxjs";
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

	private _lecturesLoaded$: Subject<void> = new Subject<void>();
	private _testsLoaded$: Subject<void> = new Subject<void>();

	constructor() {
		super();
		this.lectureList$ = this._lectureList$.asObservable();
		this.testList$ = this._testList$.asObservable();
		addIcons({ caretForwardOutline });
	}

	public ngOnInit(): void {
		this._track = this._trackStateService.currentTrack;
		if (!this.isCreator) {
			forkJoin([
				this._lecturesLoaded$.asObservable(),
				this._testsLoaded$.asObservable()
			])
				.pipe(
					takeUntilDestroyed(this._destroyRef)
				)
				.subscribe(() => {
					this.checkForTrackComplete();
					this.afterTrackInfoInitialized();
				});

		}
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
			});
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
		forkJoin([
			this._trackRequestService.getUserPassedLectures(),
			this._trackRequestService.getLecturesInTrack(this._track.id)
		])
			.pipe(
				take(1)
			)
			.subscribe(([passedLectureIds, lectures]) => {
				passedLectureIds.forEach((lectureId: number) => {
					const currentLecture: LectureModel | undefined = lectures.find((lecture: LectureModel) => lecture.id === lectureId);
					if (currentLecture) {
						currentLecture.passed = true;
					}
				});
				this._lectureList$.next(lectures);
				this._lectureStateService.setLectureList(lectures);
				this._lecturesLoaded$.next();
				this._lecturesLoaded$.complete();
			});
	}

	public loadTests(): void {
		forkJoin([
			this._trackRequestService.getUserPassedTests(),
			this._trackRequestService.getTestsInTrack(this._track.id)
		])
			.pipe(
				take(1)
			)
			.subscribe(([passedTestIds, tests]) => {
				passedTestIds.forEach((testId: number) => {
					const currentLecture: TestModel | undefined = tests.find((test: TestModel) => test.id === testId);
					if (currentLecture) {
						currentLecture.passed = true;
					}
				});
				this._testList$.next(tests);
				this._testsLoaded$.next();
				this._testsLoaded$.complete();
			});
	}

	public deleteTrack(): void {
		this._trackRequestService.deleteTrack(this._track)
			.pipe(
				take(1)
			)
			.subscribe(() => {
				this._trackStateService.loadTracks$.next();
				this._router.navigate(['tracks']);
			})
	}

	private checkForTrackComplete(): void {
		if (this._testList$.value.every((test) => test.passed) && this._lectureList$.value.every((lecture) => lecture.passed)) {
			this._trackRequestService.setTrackPassed(this._track)
				.subscribe(() => {
					this._trackStateService.loadTracks$.next();
				});
		} else {
			this._trackRequestService.setTrackFailed(this._track)
				.subscribe(() => {
					this._trackStateService.loadTracks$.next();
				});
		}
	}

	private afterTrackInfoInitialized(): void {
		this._trackStateService.checkForTrackComplete$
			.pipe(
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => {
				this.checkForTrackComplete();
			});
	}
}