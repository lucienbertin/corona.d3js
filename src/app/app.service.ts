import { Injectable, Inject } from '@angular/core';
import { DATA } from './app.token';

@Injectable()
export class AppService {
	constructor(
		@Inject(DATA) private _data,
	) {}

	extract(country: string, state = '') {
		const raw = this._data.find(d => d['Country/Region'] === country && d['Province/State'] === state)
		const entries: any[] = Object.keys(raw).slice(4).map(
			d => ({ date: new Date(d), cases: +raw[d], })
		);
		const i100th = entries.findIndex(e => e.cases >= 1000);
		entries.forEach((e, i) => e.daysSince100th = i - i100th);
		entries.forEach((e, i) => e.weeklyIncrease = e.cases - (entries[i-7] || { cases: 0 }).cases);
		return {
			name: country,
			days: entries,
		}
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
