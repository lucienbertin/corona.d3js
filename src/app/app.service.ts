import { Injectable, Inject } from '@angular/core';
import { DATA } from './app.token';

@Injectable()
export class AppService {
	constructor(
		@Inject(DATA) private _data,
	) {}

	private extract(country: string, state = '') {
		const raw = this._data.find(d => d['Country/Region'] === country && d['Province/State'] === state)
		const entries: any[] = Object.keys(raw).slice(4).map(
			d => ({ date: new Date(d), cases: raw[d], })
		);
		const i100th = entries.findIndex(e => e.cases >= 100);
		entries.forEach((e, i) => e.daysSice100th = i - i100th);
		return {
			name: country,
			days: entries,
		}
	}

	dates() {
		const raw = this._data[0];
		return  Object.keys(raw).slice(4).map(d => new Date(d));
	}
	france() {
		return this.extract('France');
	}
	italy() {
		return this.extract('Italy');
	}
	usa() {
		return this.extract('US');
	}
}
