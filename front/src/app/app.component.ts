import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthRequestService } from "./pages/auth/data/services/auth-request.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UserModel } from "./pages/auth/data/models/user.model";
import { BehaviorSubject } from "rxjs";
import { USER_INFO_TOKEN } from "./pages/auth/tokens/user-info.token";

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	standalone: true,
	imports: [RouterLink, IonicModule, CommonModule],
})
export class AppComponent implements OnInit {
	public authRequestService: AuthRequestService = inject(AuthRequestService);
	public links = [
		{ title: 'Профиль', url: '/profile', icon: 'person-outline' },
		{ title: 'Курсы', url: '/tracks', icon: 'file-tray-full-outline' },
	];
	private _userInfo$: BehaviorSubject<UserModel | null> = inject(USER_INFO_TOKEN);
	private _destroyRef = inject(DestroyRef);

	public ngOnInit(): void {
		const user: string | null = sessionStorage.getItem('user');
		if (user) {
			const userModel: UserModel = new UserModel(JSON.parse(user));
			this._userInfo$.next(userModel);
			this.authRequestService.setAuthorized(true);
		}
	}
}
