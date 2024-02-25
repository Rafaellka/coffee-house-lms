import { Routes } from '@angular/router';
import { TrackPage } from "./track.page";
import { TrackListPage } from "./pages/track-list/track-list.page";
import { TrackInfoPage } from "./pages/track-info/track-info.page";

export const routes: Routes = [
	{
		path: '',
		component: TrackPage,
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
				path: 'track-info',
				component: TrackInfoPage
			}
		]
	}
];
