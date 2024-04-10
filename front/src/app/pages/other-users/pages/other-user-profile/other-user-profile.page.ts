import { HeaderComponent } from "../../../../custom-modules/header/header.component";
import { addIcons } from "ionicons";
import { BehaviorSubject, merge, Observable, startWith, take } from "rxjs";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { TrackModel } from "../../../track/data/models/track.model";
import { OtherUserRequestService } from "../../data/services/other-user-request.service";
import { TrackStateService } from "../../../track/services/track-state.service";
import { UserRolePipe } from "../../../../custom-modules/pipes/user-role.pipe";
import { UserModel } from "../../../auth/data/models/user.model";
import { caretForwardOutline } from "ionicons/icons";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { IUserProgress } from "../../../profile/interfaces/user-progress.interface";
import { OtherUserStateService } from "../../services/other-user-state.service";


@Component({
	templateUrl: './other-user-profile.page.html',
	standalone: true,
	imports: [HeaderComponent, IonicModule, UserRolePipe, CommonModule],
	styleUrls: ['./styles/other-user-profile.page.scss']
})
export class OtherUserProfilePage implements OnInit {
	public userInfo: UserModel;
	public userProgress$: Observable<IUserProgress>;
	private _userProgressBhs$: BehaviorSubject<IUserProgress | null> = new BehaviorSubject<IUserProgress | null>(null);
	private _router: Router = inject(Router);
	private _otherUserRequestService: OtherUserRequestService = inject(OtherUserRequestService);
	private _otherUserStateService: OtherUserStateService = inject(OtherUserStateService);
	private _trackStateService: TrackStateService = inject(TrackStateService);
	private _destroyRef = inject(DestroyRef);

	constructor() {
		this.userProgress$ = this._userProgressBhs$.asObservable();
		addIcons({ caretForwardOutline })
	}

	public ngOnInit(): void {
		this.userInfo = this._otherUserStateService.currentOtherUser;
		this._otherUserStateService.loadUser$
			.pipe(
				startWith(null),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => {
				this.loadProgress();
			})
	}

	public goToTrack(track: TrackModel): void {
		this._trackStateService.currentTrack = track;
		this._router.navigate(['tracks/track-info', track.id]);
	}

	private loadProgress(): void {
		this._otherUserRequestService.getUserProgress(this.userInfo.id)
			.pipe(
				take(1)
			)
			.subscribe((progress: IUserProgress) => {
				this._userProgressBhs$.next(progress);
			});
	}
}