import { Component, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "../../custom-modules/header/header.component";
import { CommonModule } from "@angular/common";
import { TestRequestService } from "./data/services/test-request.service";
import { BehaviorSubject, Observable, take } from "rxjs";
import { QuestionModel } from "./data/models/question.model";
import { Router } from "@angular/router";
import { TestModel } from "../track/data/models/test.model";
import { IonButton, IonContent, IonList, IonModal } from "@ionic/angular/standalone";
import { AddQuestionModalComponent } from "./components/add-question-modal/add-question-modal.component";
import { WithModalComponent } from "../../custom-modules/modal/with-modal.component";
import { QuestionComponent } from "./components/question/question.component";
import { IResultItem } from "./interfaces/result-item.interface";
import { TestStateService } from "./services/test-state.service";
import { AnswerModel } from "./data/models/answer.model";

@Component({
	templateUrl: './test.page.html',
	standalone: true,
	imports: [HeaderComponent, CommonModule, IonContent, IonButton, IonModal, AddQuestionModalComponent, IonList, QuestionComponent],
	styleUrls: ['./styles/test.page.scss']
})
export class TestPage extends WithModalComponent implements OnInit {
	public get test(): TestModel {
		return this._test;
	}
	public get checkAnswersDisabled(): boolean {
		return this._results.some((result: IResultItem) => !result.answer);
	}
	public questions$: Observable<QuestionModel[]>;
	private _questions$: BehaviorSubject<QuestionModel[]> = new BehaviorSubject<QuestionModel[]>([]);
	private _testRequestService: TestRequestService = inject(TestRequestService);
	private _router: Router = inject(Router);
	private _testStateService: TestStateService = inject(TestStateService);
	private _results: IResultItem[] = [];

	private readonly _test!: TestModel;

	constructor() {
		super();
		this._test = this._testStateService.currentTest;
		this.questions$ = this._questions$.asObservable();
	}

	public ngOnInit(): void {
		this.loadQuestions();
	}

	public loadQuestions(): void {
		this._testRequestService.getQuestionsList(this._test.id)
			.pipe(
				take(1)
			)
			.subscribe({
				next: (questions: QuestionModel[]) => {
					this._questions$.next(questions);
					questions.forEach((question) => {
						this._results.push({
							question: question
						});
					})
				}
			})
	}

	public setResult(answer: AnswerModel, questionId: number): void {
		const result = this._results.find((item: IResultItem) => item.question.id === questionId);
		result.answer = answer;
	}

	public checkResults(): void {
		this._testStateService.currentTestResults = this._results;
		this._router.navigate(['results']);
	}
}