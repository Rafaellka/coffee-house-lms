import { Component, DestroyRef, inject } from "@angular/core";
import { IonButton, IonContent, IonInput } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { AuthRequestService } from "../../data/services/auth-request.service";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { IonicModule } from "@ionic/angular";

@Component({
	templateUrl: './login.page.html',
	standalone: true,
	imports: [IonicModule, FormsModule],
	styleUrls: ['./styles/login.scss']
})
export class LoginPage {
	public loginControlValue: string = '';
	public passwordControlValue: string = '';

	private _authRequestService: AuthRequestService = inject(AuthRequestService);
	private _destroyRef: DestroyRef = inject(DestroyRef);
	private _router: Router = inject(Router);

	public login(): void {
		this._authRequestService.authorize({
			login: this.loginControlValue,
			password: this.passwordControlValue
		})
			.pipe(
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe({
				next: () => {
					this._router.navigate(['tracks']);
				}
			});
	}

	public goToRegister(): void {
		this._router.navigate(['auth/registration']);
	}
}