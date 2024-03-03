import { Component, DestroyRef, inject } from "@angular/core";
import { IonButton, IonContent, IonInput } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { AuthRequestService } from "../../data/services/auth-request.service";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
	templateUrl: './login.page.html',
	standalone: true,
	imports: [IonContent, IonInput, IonButton, FormsModule]
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
}