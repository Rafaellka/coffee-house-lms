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
		path: '**',
		redirectTo: 'auth',
	}
];
