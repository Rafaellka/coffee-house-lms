import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { IQuestion } from "../interfaces/question.interface";
import { QuestionModel } from "../models/question.model";
import { UserModel } from "../../../auth/data/models/user.model";
import { USER_INFO_TOKEN } from "../../../auth/tokens/user-info.token";
import { TestModel } from "../../../track/data/models/test.model";

@Injectable({
	providedIn: 'root'
})
export class TestRequestService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _userInfo$: BehaviorSubject<UserModel> = inject(USER_INFO_TOKEN);

	public getQuestionsList(testId: number): Observable<QuestionModel[]> {
		return this._httpClient.get<IQuestion[]>(environment.apiUrl + 'question/list', {
			params: {
				testId
			}
		})
			.pipe(
				map((list: IQuestion[]) => list.map((item: IQuestion) => new QuestionModel(item)))
			)
	}

	public createQuestion(data: IQuestion): Observable<void> {
		return this._httpClient.post<void>(environment.apiUrl + 'question/create', data);
	}

	public saveTestPassed(test: TestModel): Observable<void> {
		return this._httpClient.post<void>(environment.apiUrl + 'user-test/passed', {
			testId: test.id,
			userId: this._userInfo$.value.id
		});
	}

	public deleteTest(test: TestModel): Observable<void> {
		return this._httpClient.delete<void>(environment.apiUrl + 'test/delete', {
			params: {
				testId: test.id
			}
		});
	}
}