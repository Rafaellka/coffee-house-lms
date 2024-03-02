import { ITrackResponseModel } from "../response-models/track.response-model";

export class TrackModel implements ITrackResponseModel {
	public title: string;
	public id: number;
	public description: string;

	constructor(data: ITrackResponseModel) {
		this.title = data.title;
		this.id = data.id;
		this.description = data.description;
	}

}