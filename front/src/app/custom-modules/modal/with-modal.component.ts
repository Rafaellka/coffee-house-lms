import { Directive } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Directive()
export class WithModalComponent {
	public isAddModalOpen$: Observable<boolean>;

	private _isAddModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor() {
		this.isAddModalOpen$ = this._isAddModalOpen$.asObservable();
	}

	public openModal(): void {
		this._isAddModalOpen$.next(true);
	}

	public closeModal(): void {
		this._isAddModalOpen$.next(false);
	}
}