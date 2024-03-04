import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { ITrackResponseModel } from "../response-models/track.response-model";
import { TrackModel } from "../models/track.model";
import { environment } from "../../../../../environments/environment";
import { IAddTrackRequestModel } from "../request-models/add-track.request-model";
import { ITrackInfoResponseModel } from "../response-models/track-info.response-model";
import { LectureModel } from "../models/lecture.model";
import { ILectureResponseModel } from "../response-models/lecture.response-model";
import { ITestResponseModel } from "../response-models/test.response-model";
import { TestModel } from "../models/test.model";
import { IAddLectureRequestModel } from "../request-models/add-lecture.request-model";
import { IAddTestRequestModel } from "../request-models/add-test.request-model";

@Injectable()
export class TrackRequestService {
	private _httpClient: HttpClient = inject(HttpClient);

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


}