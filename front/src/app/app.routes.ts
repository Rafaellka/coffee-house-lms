import { Routes } from '@angular/router';
import { authGuard } from "./pages/auth/guards/auth.guard";

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full'
	},
	{
		path: 'tracks',
		loadChildren: () => import('./pages/track/track.routes').then((m) => m.routes),
		canActivate: [authGuard]
	},
	{
		path: 'auth',
		loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.routes),
		canDeactivate: [authGuard]
	},
	{
		path: 'profile',
		loadChildren: () => import('./pages/profile/profile.routes').then((m) => m.routes),
		canActivate: [authGuard]
	},
	{
		path: 'lecture',
		loadChildren: () => import('./pages/lecture/lecture.routes').then((m) => m.routes),
		canActivate: [authGuard]
	},
	{
		path: 'test',
		loadChildren: () => import('./pages/test/test.routes').then((m) => m.routes),
		canActivate: [authGuard]
	},
	{
		path: 'results',
		loadChildren: () => import('./pages/test-results/test-results.routes').then((m) => m.routes),
		canActivate: [authGuard]
	},
	{
		path: '**',
		redirectTo: 'auth',
	}
];
