import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../../custom-modules/header/header.component";
import { IonicModule } from "@ionic/angular";
import { UserModel } from "../auth/data/models/user.model";
import { USER_INFO_TOKEN } from "../auth/tokens/user-info.token";
import { UserRolePipe } from "../../custom-modules/pipes/user-role.pipe";
import { LectureStateService } from "../lecture/services/lecture-state.service";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Component({
	templateUrl: './profile.page.html',
	standalone: true,
	imports: [HeaderComponent, IonicModule, UserRolePipe],
	styleUrls: ['./styles/profile.scss']
})
export class ProfilePage {
	public userInfo: UserModel;
	private _userInfo$: BehaviorSubject<UserModel> = inject(USER_INFO_TOKEN);
	private _router: Router = inject(Router);

	constructor() {
		this.userInfo = this._userInfo$.value;
	}

	public exit(): void {
		this._userInfo$.next(null);
		this._router.navigate(['auth/login']);
	}
}