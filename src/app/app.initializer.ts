import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export function initData(initializer: AppInitializer) {
	return () => initializer.initData();
}
export function getData(initializer: AppInitializer) {
	return () => initializer.getData();
}

@Injectable()
export class AppInitializer {
	private _data;
	constructor(
		private _http: HttpClient,
	) {}
	initData() {
		this._http.get(
			`//raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`,
			{ responseType: 'text' }
		).subscribe(raw => this._data = raw);
	}
	getData() {
		return this._data;
	}
}
