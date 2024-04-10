import { Routes } from "@angular/router";
import { OtherUserPage } from "./other-user.page";
import { OtherUserRequestService } from "./data/services/other-user-request.service";

export const routes: Routes = [
	{
		path: '',
		component: OtherUserPage,
		providers: [OtherUserRequestService],
		children: [
			{
				path: '',
				redirectTo: 'other-user-list',
				pathMatch: 'full'
			},
			{
				path: 'other-user-list'
			},
			{
				path: 'other-user-profile'
			}
		]
	}
]