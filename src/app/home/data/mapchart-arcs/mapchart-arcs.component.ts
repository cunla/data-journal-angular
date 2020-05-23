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
  origin: Point;
  target: Point;
}

export interface Path {
  name: string;
  path: string;
}


@Component({
  selector: 'map-chart-arcs',
  templateUrl: './mapchart-arcs.component.html',
  styleUrls: ['./mapchart-arcs.component.scss']
})
export class MapchartArcsComponent implements OnInit {
  private chart: Chart;
  @Input('arcs') arcs: Array<ArcInterface>;
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

  constructor() {
  }

  logChartInstance(chart: Highcharts.Chart) {
    this.chart = chart;

    const cities = new Set<any>();
    const tripsArray = [];
    this.arcs.forEach((arc: ArcInterface) => {
      cities.add(arc.target);
      this.addTripIfRelevant(tripsArray, arc.origin, arc.target);
    });

    this.addCitiesSeries(Array.from(cities));
    this.addPathsSeries(tripsArray);
  }

  ngOnInit() {
  }

  private addCitiesSeries(cities: Array<Point>): void {
    this.chart.addSeries({
      // Specify cities using lat/lon
      type: 'mappoint',
      name: 'Cities',
      dataLabels: {
        format: '{point.id}'
      },
      data: cities
    } as Highcharts.SeriesMappointOptions);
  }

  private addPathsSeries(tripsArray: Array<Path>): void {
    this.chart.addSeries({
      name: 'Flight routes',
      type: 'mapline',
      lineWidth: 2,
      color: Highcharts.getOptions().colors[3],
      data: tripsArray,
    } as Highcharts.SeriesMaplineOptions);
  }

  private addTripIfRelevant(tripsArray: Array<Path>, origin: Point, target: Point): void {
    if (!origin || origin.id === target.id) {
      return;
    }
    const t = {
      name: `${origin.id} - ${target.id}`,
      path: MapchartArcsComponent.pointsToPath(
        this.chart.fromLatLonToPoint(origin),
        this.chart.fromLatLonToPoint(target)),
    };
    tripsArray.push(t);
  }

  private static pointsToPath(from, to, invertArc = false): string {
    const arcPointX = (from.x + to.x) / (invertArc ? 2.4 : 1.8);
    const arcPointY = (from.y + to.y) / (invertArc ? 2.4 : 1.8);
    return `M${from.x},${from.y}Q${arcPointX} ${arcPointY},${to.x} ${to.y}`;
  }
}
