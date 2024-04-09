import { ITestResponseModel } from "../response-models/test.response-model";

export class TestModel implements ITestResponseModel {
	public id: number;
	public name: string;
	public trackId: number;
	public passed?: boolean;

	constructor(data: ITestResponseModel) {
		this.id = data.id;
		this.name = data.name;
		this.trackId = data.trackId;
	}

}