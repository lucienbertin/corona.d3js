import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { tap } from 'rxjs/operators'

export function initData(initializer: AppInitializer) {
	return () => initializer.initData();
}
export function getData(initializer: AppInitializer) {
	return initializer.getData();
}

@Injectable()
export class AppInitializer {
	private _data;
	constructor(
		private _http: HttpClient,
	) {}
	initData() {
		return this._http.get(
			`//raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`,
			{ responseType: 'text' }
		).pipe(
			tap(raw => {
				const options = {
					delimiter: ',',
					header: true,
				}
				const papa = new Papa();
				this._data = papa.parse(raw, options).data;
			}),
		).toPromise();
	}
	getData() {
		return this._data;
	}
}
