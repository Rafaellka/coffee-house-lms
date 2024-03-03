import { ILectureResponseModel } from "./lecture.response-model";
import { ITestResponseModel } from "./test.response-model";

export interface ITrackInfoResponseModel {
	lectures: ILectureResponseModel[];
	tests: ITestResponseModel[];
}