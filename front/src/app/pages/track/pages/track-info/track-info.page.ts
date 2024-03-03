import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "../../../../custom-modules/header/header.component";
import { IonButton, IonContent, IonItem, IonLabel, IonList } from "@ionic/angular/standalone";
import { ActivatedRoute } from "@angular/router";
import { TrackRequestService } from "../../data/services/track-request.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject, Observable } from "rxjs";
import { LectureModel } from "../../data/models/lecture.model";
import { TestModel } from "../../data/models/test.model";
import { CommonModule } from "@angular/common";
import { addIcons } from "ionicons";
import { caretForwardOutline } from "ionicons/icons";

@Component({
	templateUrl: './track-info.page.html',
	standalone: true,
	styleUrls: ['./styles/track-info.page.scss'],
	imports: [HeaderComponent, IonContent, IonList, IonItem, CommonModule, IonButton]
})
export class TrackInfoPage implements OnInit {
	public lectureList$: Observable<LectureModel[]>;
	public testList$: Observable<TestModel[]>;
	private _testList$: BehaviorSubject<TestModel[]> = new BehaviorSubject<TestModel[]>([]);
	private _lectureList$: BehaviorSubject<LectureModel[]> = new BehaviorSubject<LectureModel[]>([]);
	private _trackId!: number;
	private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private _trackRequestService: TrackRequestService = inject(TrackRequestService);
	private _destroyRef: DestroyRef = inject(DestroyRef);

	constructor() {
		this.lectureList$ = this._lectureList$.asObservable();
		this.testList$ = this._testList$.asObservable();
		addIcons({ caretForwardOutline });
	}

	public ngOnInit(): void {
		this._trackId = +this._activatedRoute.snapshot.params['id'];
		this._trackRequestService.getTrackInfo(this._trackId)
			.pipe(
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe((res) => {
				this._lectureList$.next(res.lectures);
				this._testList$.next(res.tests);
			});
	}
}