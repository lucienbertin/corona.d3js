import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';

const margin = { top: 30, right: 30, bottom: 70, left: 70 },
	width = 1184 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

@Injectable()
export class ChartFactory {
	constructor() {}
	forgeTimeline(
		eltRef: ElementRef,
		dates: Date[],
		...countries
	) {
		const svg = d3.select(eltRef.nativeElement)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// x axis
		const start = dates[0];
		const end = dates[dates.length-1];
		const t = d3.scaleTime()
			.range([0, width])
			.domain([start, end]);

		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(t));

		// y-axis
		const y = d3.scaleLog()
			.range([height, 0])
			.domain([1e2, 1e6])
		svg.append('g')
			.call(d3.axisLeft(y).ticks(4));

		// add lines
		countries.forEach(
			c => {
				svg.append('path')
					.attr('class', `country-line ${c.name}`)
					.datum(c.days.filter(d => d.daysSice100th >= 0))
					.attr('d', d3.line<any>()
						.x(d => t(d.date))
						.y(d => y(d.cases) || 1)
					);
			}
		)
	}
}
