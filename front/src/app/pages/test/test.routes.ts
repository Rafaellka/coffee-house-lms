import { Routes } from "@angular/router";
import { TestPage } from "./test.page";

export const routes: Routes = [
	{
		path: '',
		redirectTo: ':id',
		pathMatch: 'full'
	},
	{
		path: ':id',
		component: TestPage
	}
]