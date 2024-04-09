import { TrackModel } from "../../track/data/models/track.model";
import { LectureModel } from "../../track/data/models/lecture.model";
import { TestModel } from "../../track/data/models/test.model";

export interface IUserProgress {
	tracks: TrackModel[];
	lectures: LectureModel[];
	tests: TestModel[];
	allTracks: TrackModel[];
	allLectures: LectureModel[];
	allTests: TestModel[];
}