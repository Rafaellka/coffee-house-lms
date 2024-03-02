import { Routes } from "@angular/router";
import { RegistrationPage } from "./pages/registration/registration.page";
import { LoginPage } from "./pages/login/login.page";
import { AuthPage } from "./auth.page";

export const routes: Routes = [
	{
		path: '',
		component: AuthPage,
		children: [
			{
				path: '',
				redirectTo: 'registration',
				pathMatch: 'full'
			},
			{
				path: 'registration',
				component: RegistrationPage
			},
			{
				path: 'login',
				component: LoginPage
			},
		]
	}
];