import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { IQuestion } from "../interfaces/question.interface";
import { QuestionModel } from "../models/question.model";

@Injectable({
	providedIn: 'root'
})
export class TestRequestService {
	private _httpClient: HttpClient = inject(HttpClient);

	public getQuestionsList(): Observable<QuestionModel[]> {
		return this._httpClient.get<IQuestion[]>(environment.apiUrl + 'question/list')
			.pipe(
				map((list: IQuestion[]) => list.map((item: IQuestion) => new QuestionModel(item)))
			)
	}

	public createQuestion(data: IQuestion): Observable<void> {
		return this._httpClient.post<void>(environment.apiUrl + 'question/create', data);
	}
}