import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppInitializer, initData, getData } from './app.initializer';
import { DATA } from './app.token';
import { AppService } from './app.service';
import { ChartFactory } from './chart.factory';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
	],
	providers: [
		AppInitializer,
		{ provide: APP_INITIALIZER, useFactory: initData, deps: [AppInitializer], multi: true },
		{ provide: DATA, useFactory: getData, deps: [AppInitializer] },
		AppService,
		ChartFactory,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
