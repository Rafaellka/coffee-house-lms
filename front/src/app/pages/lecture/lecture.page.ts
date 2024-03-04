import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderComponent } from "../../custom-modules/header/header.component";
import { LectureModel } from "../track/data/models/lecture.model";
import { IonContent } from "@ionic/angular/standalone";
import { SafePipe } from "../../custom-modules/pipes/safe.pipe";

@Component({
	templateUrl: './lecture.page.html',
	standalone: true,
	imports: [HeaderComponent, IonContent, SafePipe],
	styleUrls: ['./styles/lecture.scss']
})
export class LecturePage implements OnInit {
	public get lecture(): LectureModel {
		return this._lecture;
	}
	private _router: Router = inject(Router);
	private _lecture!: LectureModel;
	public ngOnInit(): void {
		const state = this._router.getCurrentNavigation()?.extras.state;
		if (!state) {
			this._router.navigate(['/tracks']);
		} else {
			this._lecture = state['lecture'];
		}
	}
}