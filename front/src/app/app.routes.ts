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
		path: 'auth',
		loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.routes),
	},
	{
		path: '**',
		redirectTo: 'tracks',
	}
];
