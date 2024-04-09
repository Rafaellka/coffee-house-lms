import { ILectureResponseModel } from "../response-models/lecture.response-model";

export class LectureModel implements ILectureResponseModel {
	public id: number;
	public name: string;
	public order: number;
	public trackId: number;
	public videoUrl: string;
	public text: string;
	public passed?: boolean;

	constructor(data: ILectureResponseModel) {
		this.id = data.id;
		this.name = data.name;
		this.order = data.order;
		this.trackId = data.trackId;
		this.videoUrl = data.videoUrl;
		this.text = data.text;
	}

}