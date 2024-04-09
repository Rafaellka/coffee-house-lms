import { Routes } from "@angular/router";
import { TestResultPage } from "./test-result.page";

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'results',
		pathMatch: 'full'
	},
	{
		path: 'results',
		component: TestResultPage
	}
]