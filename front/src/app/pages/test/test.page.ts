import { Component, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "../../custom-modules/header/header.component";
import { CommonModule } from "@angular/common";
import { TestRequestService } from "./data/services/test-request.service";
import { BehaviorSubject, Observable, take } from "rxjs";
import { QuestionModel } from "./data/models/question.model";
import { Router } from "@angular/router";
import { TestModel } from "../track/data/models/test.model";
import { IonButton, IonContent, IonModal } from "@ionic/angular/standalone";
import { AddQuestionModalComponent } from "./components/add-question-modal/add-question-modal.component";
import { WithModalComponent } from "../../custom-modules/modal/with-modal.component";

@Component({
	templateUrl: './test.page.html',
	standalone: true,
	imports: [HeaderComponent, CommonModule, IonContent, IonButton, IonModal, AddQuestionModalComponent]
})
export class TestPage extends WithModalComponent implements OnInit {
	public get test(): TestModel {
		return this._test;
	}
	public questions$: Observable<QuestionModel[]>;
	private _questions$: BehaviorSubject<QuestionModel[]> = new BehaviorSubject<QuestionModel[]>([]);
	private _testRequestService: TestRequestService = inject(TestRequestService);
	private _router: Router = inject(Router);

	private readonly _test!: TestModel;

	constructor() {
		super();
		const state = this._router.getCurrentNavigation()?.extras.state;
		if (!state) {
			this._router.navigate(['/tracks']);
		} else {
			this._test = state['test'];
		}
		this.questions$ = this._questions$.asObservable();
	}

	public ngOnInit(): void {
		this.loadQuestions();
	}

	public loadQuestions(): void {
		this._testRequestService.getQuestionsList()
			.pipe(
				take(1)
			)
			.subscribe({
				next: (questions: QuestionModel[]) => {
					this._questions$.next(questions);
				}
			})
	}
}