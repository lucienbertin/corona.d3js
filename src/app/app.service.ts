import { Injectable, Inject } from '@angular/core';
import { DATA } from './app.token';

@Injectable()
export class AppService {
	constructor(
		@Inject(DATA) private _data,
	) {
		debugger;
	}

	franceTimeline() {
		return;
	}
}
