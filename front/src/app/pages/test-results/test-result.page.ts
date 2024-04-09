import { Component, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "../../custom-modules/header/header.component";
import { TestStateService } from "../test/services/test-state.service";
import { IResultItem } from "../test/interfaces/result-item.interface";
import { TestModel } from "../track/data/models/test.model";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { TestRequestService } from "../test/data/services/test-request.service";
import { take } from "rxjs";

@Component({
	templateUrl: './test-result.page.html',
	standalone: true,
	imports: [HeaderComponent, CommonModule, IonicModule],
	styleUrls: ['./styles/test-result.page.scss']
})
export class TestResultPage implements OnInit {
	public test: TestModel;
	public results!: IResultItem[];
	private _testStateService: TestStateService = inject(TestStateService);
	private _testRequestService: TestRequestService = inject(TestRequestService);
	private _router: Router = inject(Router);

	public ngOnInit(): void {
		this.test = this._testStateService.currentTest;
		this.results = this._testStateService.currentTestResults;
		if (this.results.every((result: IResultItem) => result.answer.isRightAnswer)) {
			this._testRequestService.saveTestPassed(this.test)
				.pipe(
					take(1)
				)
				.subscribe();
		}
	}

	public goToTrack(): void {
		this._router.navigate(['tracks/track-info', this.test.trackId]);
	}
}

