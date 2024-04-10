import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserRoleEnum } from "../../../auth/data/enums/user-role.enum";
import { environment } from "../../../../../environments/environment";
import { map, Observable } from "rxjs";
import { UserModel } from "../../../auth/data/models/user.model";
import { IUserResponseModel } from "../../../auth/data/response-models/user.response-model";
import { IUserProgress } from "../../../profile/interfaces/user-progress.interface";
import { UserProgressService } from "../../../profile/services/user-progress.service";

@Injectable()
export class OtherUserRequestService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _userProgressService: UserProgressService = inject(UserProgressService);

	public getOtherUsers(myRole: UserRoleEnum): Observable<UserModel[]> {
		return this._httpClient.get<IUserResponseModel[]>(environment.apiUrl + 'other-user/list', {
			params: {
				myRole
			}
		})
			.pipe(
				map((users: IUserResponseModel[]) => users.map((user: IUserResponseModel) => new UserModel(user)))
			)
	}

	public getUserProgress(userId: number): Observable<IUserProgress> {
		return this._userProgressService.getUserProgress(userId);
	}
}