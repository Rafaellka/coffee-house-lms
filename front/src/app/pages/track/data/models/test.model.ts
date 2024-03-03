import { ITestResponseModel } from "../response-models/test.response-model";

export class TestModel implements ITestResponseModel {
	public id: number;
	public name: string;
	public order: number;
	public trackId: number;

	constructor(data: ITestResponseModel) {
		this.id = data.id;
		this.name = data.name;
		this.order = data.order;
		this.trackId = data.trackId;
	}

}