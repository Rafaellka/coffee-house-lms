import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { ITrackResponseModel } from "../response-models/track.response-model";
import { TrackModel } from "../models/track.model";
import { environment } from "../../../../../environments/environment";
import { IAddTrackRequestModel } from "../request-models/add-track.request-model";
import { LectureModel } from "../models/lecture.model";
import { ILectureResponseModel } from "../response-models/lecture.response-model";
import { ITestResponseModel } from "../response-models/test.response-model";
import { TestModel } from "../models/test.model";
import { IAddLectureRequestModel } from "../request-models/add-lecture.request-model";
import { IAddTestRequestModel } from "../request-models/add-test.request-model";
import { UserModel } from "../../../auth/data/models/user.model";
import { USER_INFO_TOKEN } from "../../../auth/tokens/user-info.token";

@Injectable()
export class TrackRequestService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _userInfo$: BehaviorSubject<UserModel> = inject(USER_INFO_TOKEN);

	public getTrackList(): Observable<TrackModel[]> {
		return this._httpClient.get<ITrackResponseModel[]>(environment.apiUrl + 'track/list')
			.pipe(
				map((list: ITrackResponseModel[]) => list.map((item: ITrackResponseModel) => new TrackModel(item)))
			);
	}

	public getLecturesInTrack(trackId: number): Observable<LectureModel[]> {
		return this._httpClient.get<ILectureResponseModel[]>(environment.apiUrl + 'track/lectures', {
			params: {
				trackId
			}
		})
			.pipe(
				map((res: ILectureResponseModel[]) => res.map((item: ILectureResponseModel) => new LectureModel(item)))
			);
	}

	public getTestsInTrack(trackId: number): Observable<TestModel[]> {
		return this._httpClient.get<ITestResponseModel[]>(environment.apiUrl + 'track/tests', {
			params: {
				trackId
			}
		})
			.pipe(
				map((res: ITestResponseModel[]) => res.map((item: ITestResponseModel) => new TestModel(item)))
			);
	}

	public addTrack(data: IAddTrackRequestModel): Observable<void> {
		return this._httpClient.post<void>(environment.apiUrl + 'track/add', data);
	}

	public addLecture(data: IAddLectureRequestModel): Observable<void> {
		return this._httpClient.post<void>(environment.apiUrl + 'lecture/add', data);
	}

	public addTest(data: IAddTestRequestModel): Observable<void> {
		return this._httpClient.post<void>(environment.apiUrl + 'test/add', data);
	}

	public getUserPassedTracks(): Observable<number[]> {
		return this._httpClient.get<number[]>(environment.apiUrl + 'user-track/list', {
			params: {
				userId: this._userInfo$.value.id
			}
		})
	}

	public getUserPassedLectures(): Observable<number[]> {
		return this._httpClient.get<number[]>(environment.apiUrl + 'user-lecture/list', {
			params: {
				userId: this._userInfo$.value.id
			}
		})
	}

	public getUserPassedTests(): Observable<number[]> {
		return this._httpClient.get<number[]>(environment.apiUrl + 'user-test/list', {
			params: {
				userId: this._userInfo$.value.id
			}
		})
	}
}