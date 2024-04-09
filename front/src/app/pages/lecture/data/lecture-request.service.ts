import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LectureModel } from "../../track/data/models/lecture.model";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { USER_INFO_TOKEN } from "../../auth/tokens/user-info.token";
import { UserModel } from "../../auth/data/models/user.model";

@Injectable({
	providedIn: 'root'
})
export class LectureRequestService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _userInfo$: BehaviorSubject<UserModel> = inject(USER_INFO_TOKEN);

	public lecturePassed(lecture: LectureModel): Observable<void> {
		return this._httpClient.post<void>(environment.apiUrl + 'user-lecture/passed', {
			lectureId: lecture.id,
			userId: this._userInfo$.value.id
		});
	}
}