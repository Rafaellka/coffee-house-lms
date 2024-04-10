import { Routes } from "@angular/router";
import { OtherUserPage } from "./other-user.page";
import { OtherUserRequestService } from "./data/services/other-user-request.service";
import { OtherUserProfilePage } from "./pages/other-user-profile/other-user-profile.page";
import { OtherUserListPage } from "./pages/othre-user-list/other-user-list.page";
import { OtherUserStateService } from "./services/other-user-state.service";

export const routes: Routes = [
	{
		path: '',
		component: OtherUserPage,
		providers: [OtherUserRequestService, OtherUserStateService],
		children: [
			{
				path: '',
				redirectTo: 'other-user-list',
				pathMatch: 'full'
			},
			{
				path: 'other-user-list',
				component: OtherUserListPage
			},
			{
				path: 'other-user-profile',
				component: OtherUserProfilePage
			}
		]
	}
]
