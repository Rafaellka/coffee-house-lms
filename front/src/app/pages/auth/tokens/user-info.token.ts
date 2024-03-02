import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../data/models/user.model";

export const USER_INFO_TOKEN: InjectionToken<BehaviorSubject<UserModel | null>>
	= new InjectionToken<BehaviorSubject<UserModel | null>>('токен с инфой о текущем пользователе', {
		providedIn: 'root',
		factory: () => new BehaviorSubject<UserModel | null>(null)
	}
);