import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "../../custom-modules/header/header.component";
import { IonicModule } from "@ionic/angular";
import { UserModel } from "../auth/data/models/user.model";
import { USER_INFO_TOKEN } from "../auth/tokens/user-info.token";
import { UserRolePipe } from "../../custom-modules/pipes/user-role.pipe";
import { BehaviorSubject, merge, Observable, startWith, switchMap, take } from "rxjs";
import { Router } from "@angular/router";
import { IUserProgress } from "./interfaces/user-progress.interface";
import { UserProgressService } from "./services/user-progress.service";
import { CommonModule } from "@angular/common";
import { TrackModel } from "../track/data/models/track.model";
import { addIcons } from "ionicons";
import { caretForwardOutline } from "ionicons/icons";
import { TrackStateService } from "../track/services/track-state.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
	templateUrl: './profile.page.html',
	standalone: true,
	imports: [HeaderComponent, IonicModule, UserRolePipe, CommonModule],
	styleUrls: ['./styles/profile.scss']
})
export class ProfilePage implements OnInit {
	public userInfo: UserModel;
	public readonly userProgress$: Observable<IUserProgress>;
	private _userProgressBhs$: BehaviorSubject<IUserProgress | null> = new BehaviorSubject<IUserProgress | null>(null);
	private _userInfo$: BehaviorSubject<UserModel> = inject(USER_INFO_TOKEN);
	private _router: Router = inject(Router);
	private _userProgressService: UserProgressService = inject(UserProgressService);
	private _trackStateService: TrackStateService = inject(TrackStateService);
	private _destroyRef = inject(DestroyRef);

	constructor() {
		this.userInfo = this._userInfo$.value;
		this.userProgress$ = this._userProgressBhs$.asObservable();
		addIcons({ caretForwardOutline })
	}

	public ngOnInit(): void {
		merge(
			this._userInfo$,
			this._userProgressService.loadProgress$
		)
			.pipe(
				startWith(null),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => {
				this.loadProgress();
			})
	}

	public exit(): void {
		this._userInfo$.next(null);
		this._userProgressBhs$.next(null);
		this._router.navigate(['auth/login']);
	}

	public goToTrack(track: TrackModel): void {
		this._trackStateService.currentTrack = track;
		this._router.navigate(['tracks/track-info', track.id]);
	}

	private loadProgress(): void {
		this.userInfo = this._userInfo$.value;
		this._userProgressService.getUserProgress(this._userInfo$.value.id)
			.pipe(
				take(1)
			)
			.subscribe((progress: IUserProgress) => {
				this._userProgressBhs$.next(progress);
			});
	}
}