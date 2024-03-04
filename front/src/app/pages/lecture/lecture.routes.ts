import { Routes } from "@angular/router";
import { LecturePage } from "./lecture.page";

export const routes: Routes = [
	{
		path: '',
		redirectTo: ':id',
		pathMatch: 'full'
	},
	{
		path: ':id',
		component: LecturePage
	}
]