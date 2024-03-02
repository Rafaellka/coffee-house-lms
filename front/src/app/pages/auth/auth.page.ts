import { Component } from "@angular/core";
import { IonButton, IonContent, IonInput, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { UserRoleEnum } from "./data/enums/user-role.enum";
import { CommonModule } from "@angular/common";

@Component({
	templateUrl: './auth.page.html',
	standalone: true,
	imports: [IonContent, IonInput, IonButton, FormsModule, IonSelect, IonSelectOption, CommonModule],
	styleUrls: ['./styles/auth.page.scss']
})
export class AuthPage {
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
	]
}