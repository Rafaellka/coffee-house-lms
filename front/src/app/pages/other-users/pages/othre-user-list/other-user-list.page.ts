import { HeaderComponent } from "../../../../custom-modules/header/header.component";
import { Component, inject, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { UserRolePipe } from "../../../../custom-modules/pipes/user-role.pipe";
import { OtherUserStateService } from "../../services/other-user-state.service";
import { OtherUserRequestService } from "../../data/services/other-user-request.service";
import { BehaviorSubject, Observable, take } from "rxjs";
import { UserModel } from "../../../auth/data/models/user.model";
import { USER_INFO_TOKEN } from "../../../auth/tokens/user-info.token";
import { Router } from "@angular/router";


@Component({
	templateUrl: './other-user-list.page.html',
	standalone: true,
	imports: [HeaderComponent, IonicModule, UserRolePipe, CommonModule],
	styleUrls: ['./styles/other-user-list-page.scss']
})
export class OtherUserListPage implements OnInit {
	public userList$: Observable<UserModel[]>;
	private _userList$: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
	private _otherUserStateService: OtherUserStateService = inject(OtherUserStateService);
	private _otherUserRequestService: OtherUserRequestService = inject(OtherUserRequestService);
	private _myUserInfo: BehaviorSubject<UserModel> = inject(USER_INFO_TOKEN);
	private _router: Router = inject(Router);
	public ngOnInit(): void {
		this.userList$ = this._userList$.asObservable();
		this._otherUserRequestService.getOtherUsers(this._myUserInfo.value.role)
			.pipe(
				take(1)
			)
			.subscribe((users: UserModel[]) => {
				this._userList$.next(users);
			});
	}

	public goToUserProfile(user: UserModel): void {
		this._otherUserStateService.currentOtherUser = user;
		this._router.navigate(['/other-user/other-user-profile']);
	}
}
