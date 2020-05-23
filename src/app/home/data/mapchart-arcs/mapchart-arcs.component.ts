import {Component, Input, OnInit} from '@angular/core';
import * as proj4x from 'proj4';
import * as Highcharts from 'highcharts';
import {Chart} from 'highcharts';
import MapModule from 'highcharts/modules/map';

declare var require: any;

const proj4 = (proj4x as any).default;
declare global {
  interface Window {
    proj4: any;
  }
}
window.proj4 = proj4;

MapModule(Highcharts);
const mapWorld = require('@highcharts/map-collection/custom/world.geo.json');

export interface Point {
  id: string;
  lon: number;
  lat: number
}

export interface ArcInterface {
  color: string;
  origin: Point;
  target: Point;
}

interface Path {
  name: string;
  path: string;
  color: string;
}


@Component({
  selector: 'map-chart-arcs',
  templateUrl: './mapchart-arcs.component.html',
  styleUrls: ['./mapchart-arcs.component.scss']
})
export class MapchartArcsComponent implements OnInit {
  private chart: Chart;

  @Input('inputArcs') inputArcs: Array<ArcInterface>;

  Highcharts: typeof Highcharts = Highcharts; // required

  chartOptions: Highcharts.Options = {
    credits: {enabled: false},
    chart: {map: mapWorld},
    title: {text: 'Countries visited'},
    mapNavigation: {enabled: true,},
    scrollbar: {enabled: true},
    yAxis: {scrollbar: {enabled: true}},
    tooltip: {
      formatter: function () {
        const p = <any>this.point;
        return `${p.id}${p.lat ? '<br>Lat: ' + p.lat + ' Lon: ' + p.lon : ''}`;
      }
    },
    legend: {
      enabled: false,
    },
    series: [{name: 'Countries', allAreas: true,} as Highcharts.SeriesMapOptions]
  };

  private actualArcs = [];

  constructor() {
  }

  logChartInstance(chart: Highcharts.Chart) {
    this.chart = chart;

    const cities = new Set<any>();
    this.inputArcs.forEach((arc: ArcInterface) => {
      cities.add(arc.target);
      cities.add(arc.origin);
      this.addArcIfRelevant(arc.origin, arc.target, arc.color);
    });

    this.addCitiesSeries(Array.from(cities));
    this.addPathsSeries();
  }

  ngOnInit() {
  }

  private addCitiesSeries(cities: Array<Point>): void {
    this.chart.addSeries({
      // Specify cities using lat/lon
      type: 'mappoint',
      name: 'Cities',
      dataLabels: {
        format: '{point.id}',
      },
      data: cities,
    } as Highcharts.SeriesMappointOptions);
  }

  private addPathsSeries(): void {
    this.chart.addSeries({
      name: 'Flight routes',
      type: 'mapline',
      lineWidth: 2,
      color: Highcharts.getOptions().colors[5],
      data: this.actualArcs,
    } as Highcharts.SeriesMaplineOptions);
  }

  private addArcIfRelevant(origin: Point, target: Point, pathColor: string): void {
    if (!origin || origin.id === target.id) {
      console.log('Got invalid arc, bad origin or origin and target the same');
      return;
    }
    const t = {
      name: `${origin.id} - ${target.id}`,
      path: MapchartArcsComponent.pointsToPath(
        this.chart.fromLatLonToPoint(origin),
        this.chart.fromLatLonToPoint(target)),
      color: pathColor,
    };
    this.actualArcs.push(t);
  }

  private static pointsToPath(from, to, invertArc = false): string {
    const arcPointX = (from.x + to.x) / (invertArc ? 2.4 : 1.8);
    const arcPointY = (from.y + to.y) / (invertArc ? 2.4 : 1.8);
    return `M${from.x},${from.y}Q${arcPointX} ${arcPointY},${to.x} ${to.y}`;
  }
}
