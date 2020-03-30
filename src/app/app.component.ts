import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from './app.service';
import { ChartFactory } from './chart.factory';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	@ViewChild('timeline', { static: true, read: ElementRef }) private _timelineEltRef: ElementRef;
	private _dates;
	private _france;
	constructor(
		private _service: AppService,
		private _factory: ChartFactory,
	) {}
	ngOnInit() {
		const dates = this._service.dates();
		const france = this._service.france();
		const italy = this._service.italy();
		const usa = this._service.usa();
		this._factory.forgeTimeline(this._timelineEltRef, dates, france, italy, usa);
	}
}
