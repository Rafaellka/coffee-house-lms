import { Component } from "@angular/core";
import { IonButton, IonContent, IonInput } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";

@Component({
	templateUrl: './login.page.html',
	standalone: true,
	imports: [IonContent, IonInput, IonButton, FormsModule]
})
export class LoginPage {
	public loginControlValue: string = '';
	public passwordControlValue: string = '';
}