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
	@ViewChild('newPerConfirmed', { static: true, read: ElementRef }) private _newPerConfirmedEltRef: ElementRef;

	constructor(
		private _service: AppService,
		private _factory: ChartFactory,
	) {}
	ngOnInit() {
		// const dates = this._service.dates();
		const france = this._service.extract('France');
		const italy = this._service.extract('Italy');
		const usa = this._service.extract('US');
		const portugal = this._service.extract('Portugal');
		// const hubei = this._service.extract('China', 'Hubei');
		const korea = this._service.extract('Korea, South');
		const singapore = this._service.extract('Singapore');
		const germany = this._service.extract('Germany');
		const spain = this._service.extract('Spain');
		this._factory.forgeTimeline(
			this._timelineEltRef,
			france,
			italy,
			usa,
			portugal,
			// korea,
			// singapore,
			germany,
			spain,
		);

		this._factory.forgeNewPerConfirmed(
			this._newPerConfirmedEltRef,
			france,
			italy,
			usa,
			portugal,
			// korea,
			// singapore,
			germany,
			spain,
			// hubei,
		)
	}
}
