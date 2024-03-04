import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'safe',
	standalone: true
})
export class SafePipe implements PipeTransform {
	private _sanitizer: DomSanitizer = inject(DomSanitizer);

	public transform(url: string) {
		return this._sanitizer.bypassSecurityTrustResourceUrl(url);
	}

}