import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { TrackModel } from "../../data/models/track.model";

@Component({
	templateUrl: './track-list.page.html',
	standalone: true,
	styleUrls: ['./styles/track-list.page.scss']
})
export class TrackListPage implements OnInit {
	public trackList$: Observable<TrackModel[]>;

	public ngOnInit(): void {

	}
}