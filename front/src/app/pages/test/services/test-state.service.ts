import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { TestModel } from "../../track/data/models/test.model";
import { IResultItem } from "../interfaces/result-item.interface";

@Injectable({
	providedIn: 'root'
})
export class TestStateService {
	public get currentTest(): TestModel | null {
		return this._currentTestBhs$.value;
	}

	public set currentTest(value: TestModel) {
		this._currentTestBhs$.next(value);
	}

	public get currentTestResults(): IResultItem[] | null {
		return this._currentTestResultsBhs$.value;
	}

	public set currentTestResults(value: IResultItem[]) {
		this._currentTestResultsBhs$.next(value);
	}
	public loadTests$: Subject<void> = new Subject<void>();
	private _currentTestBhs$: BehaviorSubject<TestModel | null> = new BehaviorSubject<TestModel | null>(null);

	private _currentTestResultsBhs$: BehaviorSubject<IResultItem[] | null> = new BehaviorSubject<IResultItem[] | null>(null);
}