import {Component, Input} from "@angular/core";
import {MenuController} from "@ionic/angular";
import { IonHeader, IonTitle, IonToolbar } from "@ionic/angular/standalone";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Input()
    public title: string = '';
    constructor(
        private _menuController: MenuController
    ) {}

    public openNavigation(): void {
        this._menuController.open('navigation');
    }
}