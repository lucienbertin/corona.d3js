import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	france;
	constructor(
		private _service: AppService,
	) {}
	ngOnInit() {
		this.france = this._service.france();
	}
}
