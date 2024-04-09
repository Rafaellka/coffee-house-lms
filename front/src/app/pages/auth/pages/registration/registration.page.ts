import { Component, DestroyRef, inject } from "@angular/core";
import { UserRoleEnum } from "../../data/enums/user-role.enum";
import { IonButton, IonContent, IonInput, IonNavLink, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthRequestService } from "../../data/services/auth-request.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";

@Component({
	templateUrl: './registration.page.html',
	standalone: true,
	imports: [IonContent, IonInput, IonButton, FormsModule, IonSelect, IonSelectOption, CommonModule],
	styleUrls: ['./styles/registration.scss']
})
export class RegistrationPage {
	public loginControlValue: string = '';
	public passwordControlValue: string = '';
	public nameControlValue: string = '';
	public roleControlValue: UserRoleEnum = UserRoleEnum.intern;

	public roleSelectControlOptions: Array<{ role: UserRoleEnum, name: string }> = [
		{
			name: 'Интерн',
			role: UserRoleEnum.intern

		},
		{
			name: 'Бариста',
			role: UserRoleEnum.barista
		},
		{
			name: 'Менеджер',
			role: UserRoleEnum.manager
		},
		{
			name: 'Управляющий',
			role: UserRoleEnum.administrator
		},
		{
			name: 'Менеджер по персоналу',
			role: UserRoleEnum.hr
		},
	];

	private _authRequestService: AuthRequestService = inject(AuthRequestService);
	private _destroyRef: DestroyRef = inject(DestroyRef);
	private _router: Router = inject(Router);

	public register(): void {
		this._authRequestService.register({
			name: this.nameControlValue,
			role: this.roleControlValue,
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

	public goToLogin(): void {
		this._router.navigate(['auth/login']);
	}
}