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

@Injectable()
export class TrackRequestService {
	private _httpClient: HttpClient = inject(HttpClient);

	public getTrackList(): Observable<TrackModel[]> {
		return this._httpClient.get<ITrackResponseModel[]>(environment.apiUrl + 'track/list')
			.pipe(
				map((list: ITrackResponseModel[]) => list.map((item: ITrackResponseModel) => new TrackModel(item)))
			);
	}

	public getTrackInfo(trackId: number): Observable<{ lectures: LectureModel[], tests: TestModel[] }> {
		return this._httpClient.get<ITrackInfoResponseModel>(environment.apiUrl + 'track/details', {
			params: {
				trackId
			}
		})
			.pipe(
				map((res: ITrackInfoResponseModel) => {
					const lectures = res.lectures.map((item: ILectureResponseModel) => new LectureModel(item));
					const tests = res.tests.map(((item: ITestResponseModel) => new TestModel(item)));

					return {
						lectures,
						tests
					}
				})
			);
	}

	public addTrack(data: IAddTrackRequestModel): Observable<void> {
		return this._httpClient.post<void>(environment.apiUrl + 'track/add', data);
	}
}