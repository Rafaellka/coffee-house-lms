import { Routes } from '@angular/router';
import { TrackPage } from "./track.page";
import { TrackListPage } from "./pages/track-list/track-list.page";
import { TrackInfoPage } from "./pages/track-info/track-info.page";
import { TrackRequestService } from "./data/services/track-request.service";

export const routes: Routes = [
	{
		path: '',
		component: TrackPage,
		providers: [TrackRequestService],
		children: [
			{
				path: '',
				redirectTo: 'track-list',
				pathMatch: 'full'
			},
			{
				path: 'track-list',
				component: TrackListPage
			},
			{
				path: 'track-info/:id',
				component: TrackInfoPage
			}
		]
	}
];
