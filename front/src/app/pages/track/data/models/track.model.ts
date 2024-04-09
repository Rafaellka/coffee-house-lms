import { ITrackResponseModel } from "../response-models/track.response-model";

export class TrackModel implements ITrackResponseModel {
	public name: string;
	public id: number;
	public description: string;
	public passed?: boolean;

	constructor(data: ITrackResponseModel) {
		this.name = data.name;
		this.id = data.id;
		this.description = data.description;
	}

}