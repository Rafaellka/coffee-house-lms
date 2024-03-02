import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { ITrackResponseModel } from "../response-models/track.response-model";
import { TrackModel } from "../models/track.model";

@Injectable()
export class TrackRequestService {
	private _httpClient: HttpClient = inject(HttpClient);

	public getTrackList(): Observable<TrackModel[]> {
		return of([
			{
				id: 1,
				title: 'Курс 1',
				description: 'fdsadafsdsafds'
			},
			{
				id: 2,
				title: 'Курс 2',
				description: 'fdsadafsdsafds'
			},
			{
				id: 3,
				title: 'Курс 3',
				description: 'fdsadafsdsafds'
			},
		]);
		return this._httpClient.get<ITrackResponseModel[]>('')
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
}