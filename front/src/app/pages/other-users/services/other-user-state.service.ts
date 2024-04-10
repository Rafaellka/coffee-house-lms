import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { UserModel } from "../../auth/data/models/user.model";

@Injectable({
	providedIn: 'root'
})
export class OtherUserStateService {
	public get currentOtherUser(): UserModel {
		return this._currentOtherUser.value;
	}

	public set currentOtherUser(value: UserModel) {
		this._currentOtherUser.next(value);
	}
	public loadUser$: Subject<void> = new Subject<void>();
	private _currentOtherUser: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
}