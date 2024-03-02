import { Component, inject } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthRequestService } from "./pages/auth/data/services/auth-request.service";

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	standalone: true,
	imports: [RouterLink, IonicModule, CommonModule],
})
export class AppComponent {
	public authRequestService: AuthRequestService = inject(AuthRequestService);
	public links = [
		{ title: 'Профиль', url: '/profile', icon: 'person-outline' },
		{ title: 'Курсы', url: '/tracks', icon: 'file-tray-full-outline' },
	];
}
