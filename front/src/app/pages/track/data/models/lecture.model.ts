import { ILectureResponseModel } from "../response-models/lecture.response-model";

export class LectureModel implements ILectureResponseModel {
	public id: number;
	public name: string;
	public text: string;
	public order: number;
	public trackId: number;

	constructor(data: ILectureResponseModel) {
		this.id = data.id;
		this.name = data.name;
		this.text = data.text;
		this.order = data.order;
		this.trackId = data.trackId;
	}

}