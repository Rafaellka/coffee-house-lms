import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ITrackResponseModel } from "../response-models/track.response-model";
import { TrackModel } from "../models/track.model";

@Injectable()
export class TrackRequestService {
	private _httpClient: HttpClient = inject(HttpClient);

	public getTrackList(): Observable<TrackModel[]> {
		return this._httpClient.get<ITrackResponseModel[]>('')
			.pipe(
				map((list: ITrackResponseModel[]) => list.map((item: ITrackResponseModel) => new TrackModel(item)))
			);
	}
}