import { Component } from "@angular/core";
import { HeaderComponent } from "../../../../custom-modules/header/header.component";
import { IonContent } from "@ionic/angular/standalone";

@Component({
	templateUrl: './track-info.page.html',
	standalone: true,
	styleUrls: ['./styles/track-info.page.scss'],
	imports: [HeaderComponent, IonContent]
})
export class TrackInfoPage {

}