import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';

const margin = { top: 30, right: 30, bottom: 70, left: 70 },
	width = 1184 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom,
	halfWidth = (1184 - margin.left * 2 - margin.right * 2) / 2;

@Injectable()
export class ChartFactory {
	constructor() {}
	forgeTimeline(
		eltRef: ElementRef,
		...countries
	) {
		const svg = d3.select(eltRef.nativeElement)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// x axis
		const firstDays = countries.map(c => c.days.find(d => d.daysSince100th === 0).date).sort((a, b) => a - b)
		const tStart = firstDays[0];
		const tEnd = countries[0].days[countries[0].days.length - 1].date;
		const nStart = 0;
		const daysSince100th = countries
			.map(c => c.days.map(d => d.daysSince100th))
			.reduce((memo, indexes) => [... memo, ...indexes], [])
			.sort((a, b) => b - a)
		const nEnd = daysSince100th[0];

		const t = d3.scaleTime()
			.range([0, halfWidth])
			.domain([tStart, tEnd]);
		const n = d3.scaleLinear()
			.range([halfWidth + margin.left + margin.right, width])
			.domain([nStart, nEnd]);

		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(t));
		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(n));

		// y-axis
		const y = d3
			.scaleLog().domain([1e2, 1e6])
			// .scaleLinear().domain([0, 2e5])
			.range([height, 0])
		svg.append('g')
			.call(d3.axisLeft(y).ticks(4));
		svg.append('g')
			.attr('transform', `translate(${halfWidth + margin.left + margin.right }, 0)`)
			.call(d3.axisLeft(y).ticks(4));

		// add dotted lines for reference
		svg.append('line')
		.attr('x1', n(0))
			.attr('x2', n(27))
			.attr('y1', y(1e2))
			.attr('y2', y(1e6))
			.attr('class', 'reference-line')
		svg.append('line')
			.attr('x1', n(0))
			.attr('x2', n(29))
			.attr('y1', y(1e2))
			.attr('y2', y(1e5))
			.attr('class', 'reference-line')
		svg.append('line')
			.attr('x1', n(0))
				.attr('x2', n(27))
				.attr('y1', y(1e2))
				.attr('y2', y(1e4))
				.attr('class', 'reference-line')

		// add country lines
		countries.forEach(
			c => {
				// 
				svg.append('path')
					.attr('class', `country-line ${c.name}`)
					.datum(c.days.filter(d => d.daysSince100th >= 0))
					.attr('d', d3.line<any>()
						.x(d => t(d.date))
						.y(d => y(d.cases))
					);
				const ratio = c.days.find(d => d.daysSince100th === 0).cases / 100
				svg.append('path')
					.attr('class', `country-line ${c.name}`)
					.datum(c.days.filter(d => d.daysSince100th >= 0))
					.attr('d', d3.line<any>()
						.x(d => n(d.daysSince100th))
						.y(d => y(d.cases / ratio))
					);
				const lastDay = c.days[c.days.length-1];
				svg
					.append('circle')
					.attr('class', `country-dot ${c.name}`)
					.attr('cx', n(lastDay.daysSince100th))
					.attr('cy', y(lastDay.cases / ratio))
					.attr('r', 1)
			}
		)
	}

	forgeNewPerConfirmed(
		eltRef: ElementRef,
		...countries
	) {
		const svg = d3.select(eltRef.nativeElement)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// x-axis
		const x = d3.scaleLog()
			.range([0, width])
			.domain([1e2, 1e6])
		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(x).ticks(4));

		// y-axis
		const y = d3.scaleLog()
			.range([height, 0])
			.domain([1e1, 1e5])
		svg.append('g')
			.call(d3.axisLeft(y).ticks(4));

		svg.append('line')
			.attr('x1', x(1e2))
			.attr('x2', x(1e5))
			.attr('y1', y(1e2))
			.attr('y2', y(1e5))
			.attr('class', 'reference-line')
		// add country lines
		countries.forEach(
			c => {
				// 
				svg.append('path')
					.attr('class', `country-line ${c.name}`)
					.datum(c.days.filter(d => d.daysSince100th >= 0))
					.attr('d', d3.line<any>()
						.x(d => x(d.cases))
						.y(d => y(d.weeklyIncrease))
					);

				const lastDay = c.days[c.days.length-1];
				svg
					.append('circle')
					.attr('class', `country-dot ${c.name}`)
					.attr('cx', x(lastDay.cases))
					.attr('cy', y(lastDay.weeklyIncrease))
					.attr('r', 1)
			}
		);
	}
}
