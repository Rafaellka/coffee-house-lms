import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'tracks',
		pathMatch: 'full'
	},
	{
		path: 'tracks',
		loadChildren: () => import('./pages/track/track.routes').then((m) => m.routes),
	},
	{
		path: '**',
		redirectTo: 'tracks',
	}
];
