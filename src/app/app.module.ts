import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppInitializer, initData, getData } from './app.initializer';
import { DATA } from './app.token';
import { AppService } from './app.service';

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
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
