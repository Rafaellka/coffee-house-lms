import { Component } from "@angular/core";
import { IonContent, IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
	templateUrl: './auth.page.html',
	standalone: true,
	imports: [IonRouterOutlet, IonContent]
})
export class AuthPage {
}