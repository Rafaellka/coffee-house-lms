import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { USER_INFO_TOKEN } from "../../tokens/user-info.token";
import { IAuthUserResponseModel } from "../response-models/auth-user.response-model";
import { UserModel } from "../models/user.model";
import { ICreateUserRequestModel } from "../request-models/create-user.request-model";
import { IAuthUserRequestModel } from "../request-models/auth-user.request-model";

@Injectable({
	providedIn: 'root'
})
export class AuthRequestService {
	public get isAuthorized(): boolean {
		return this._isAuthorized$.getValue();
	}

	public isAuthorized$: Observable<boolean>;
	private _isAuthorized$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private _httpClient: HttpClient = inject(HttpClient);
	private _userInfo$: BehaviorSubject<UserModel | null> = inject(USER_INFO_TOKEN);
	constructor() {
		this.isAuthorized$ = this._isAuthorized$.asObservable();
		this._userInfo$
			.subscribe((value: UserModel | null) => {
				this.setAuthorized(!!value);
			})
	}

	public setAuthorized(isAuthorized: boolean): void {
		this._isAuthorized$.next(isAuthorized);
	}
	/** Авторизация */
	public authorize(data: IAuthUserRequestModel): Observable<boolean> {
		return this._httpClient.post<IAuthUserResponseModel>(environment.apiUrl + 'auth/login', data)
			.pipe(
				tap((res: IAuthUserResponseModel) => {
					if (res.loggedIn) {
						const userModel: UserModel = new UserModel(res.user);
						this._userInfo$.next(userModel);
						localStorage.setItem('user', JSON.stringify(res.user));
						this._isAuthorized$.next(true);
					}
				}),
				map(() => this._isAuthorized$.getValue())
			);
	}

	/** Регистрация */
	public register(data: ICreateUserRequestModel): Observable<boolean> {
		return this._httpClient.post<IAuthUserResponseModel>(environment.apiUrl + 'auth/register', data)
			.pipe(
				tap((res: IAuthUserResponseModel) => {
					if (res.loggedIn) {
						const userModel: UserModel = new UserModel(res.user);
						this._userInfo$.next(userModel);
						localStorage.setItem('user', JSON.stringify(res.user));
						this._isAuthorized$.next(true);
					}
				}),
				map(() => this._isAuthorized$.getValue())
			);
	}
}