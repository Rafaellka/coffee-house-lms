import { Component, inject, Input } from "@angular/core";
import { TrackModel } from "../../data/models/track.model";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/angular/standalone";
import { Router } from "@angular/router";
import { TrackStateService } from "../../services/track-state.service";

@Component({
	selector: 'track-list-item',
	templateUrl: './track-list-item.component.html',
	standalone: true,
	imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class TrackListItemComponent {
	@Input()
	public model!: TrackModel;
	private _router: Router = inject(Router);
	private _trackStateService: TrackStateService = inject(TrackStateService);

	public goToTrackInfo(): void {
		this._trackStateService.currentTrack = this.model;
		this._router.navigate(['tracks/track-info', this.model.id]);
	}
}