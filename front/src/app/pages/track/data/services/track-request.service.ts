import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { ITrackResponseModel } from "../response-models/track.response-model";
import { TrackModel } from "../models/track.model";
import { environment } from "../../../../../environments/environment";
import { IAddTrackRequestModel } from "../request-models/add-track.request-model";

@Injectable()
export class TrackRequestService {
	private _httpClient: HttpClient = inject(HttpClient);

	public getTrackList(): Observable<TrackModel[]> {
		return this._httpClient.get<ITrackResponseModel[]>(environment.apiUrl + 'track/list')
			.pipe(
				map((list: ITrackResponseModel[]) => list.map((item: ITrackResponseModel) => new TrackModel(item)))
			);
	}

	public getTrackInfo(trackId: number): Observable<any> {
		return this._httpClient.get('')
			.pipe(
				map(() => {})
			)
	}

	public addTrack(data: IAddTrackRequestModel): Observable<void> {
		return this._httpClient.post<void>(environment.apiUrl + 'track/add', data)
	}
}