import {TripInterface, TripsService} from '../../trips/trips.service';
import {Component, OnInit} from '@angular/core';
import * as proj4x from 'proj4';
import * as Highcharts from 'highcharts';
import {Chart} from 'highcharts';
import MapModule from 'highcharts/modules/map';
import {CitiesService} from '../../common/cities.service';

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

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  private chart: Chart;

  constructor(private tripsService: TripsService) {

  }

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'mapChart';
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

  private static sortByDates(a: TripInterface, b: TripInterface) {
    if (a.start > b.start) {
      return 1;
    } else if (a.start < b.start) {
      return -1;
    } else {
      return 0;
    }
  }

  static pointsToPath(from, to, invertArc = false): string {
    const arcPointX = (from.x + to.x) / (invertArc ? 2.4 : 1.8);
    const arcPointY = (from.y + to.y) / (invertArc ? 2.4 : 1.8);
    return `M${from.x},${from.y}Q${arcPointX} ${arcPointY},${to.x} ${to.y}`;
  }

  logChartInstance(chart: Highcharts.Chart) {
    this.chart = chart;
    const torontoLatLng = CitiesService.getCityLngLat('Toronto');
    const cities = [torontoLatLng,];
    const tripsArray = [];
    this.tripsService.data.subscribe(trips => {
      const sortedTrips = trips.sort(ChartComponent.sortByDates);
      const torontoPoint = chart.fromLatLonToPoint(torontoLatLng);
      // tslint:disable-next-line:forin
      for (const ind in sortedTrips) {
        const cityData = {
          id: sortedTrips[ind].city,
          lon: +sortedTrips[ind].lng,
          lat: +sortedTrips[ind].lat,
        };
        if (cityData && cityData.lat && cityData.lon) {
          cities.push(cityData);
          const t = {
            name: `Toronto - ${cityData.id}`,
            path: ChartComponent.pointsToPath(torontoPoint, chart.fromLatLonToPoint(cityData))
          };
          tripsArray.push(t);
        }
      }
      this.chart.addSeries({
        // Specify cities using lat/lon
        type: 'mappoint',
        name: 'Cities',
        dataLabels: {
          format: '{point.id}'
        },
        data: cities
      } as Highcharts.SeriesMappointOptions);

      chart.addSeries({
        name: 'Flight routes',
        type: 'mapline',
        lineWidth: 2,
        color: Highcharts.getOptions().colors[3],
        data: tripsArray,
      } as Highcharts.SeriesMaplineOptions);
    });
  }

  ngOnInit() {
  }
}
