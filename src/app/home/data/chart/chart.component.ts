import {Component, OnInit} from '@angular/core';
import {TripsService} from '../../trips/trips.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  data = [
    ['Location', '# Trips'],
  ];
  options = {
    colorAxis: {colors: ['lightgreen', 'blue']}
  };

  constructor(private tripsService: TripsService,) {
    tripsService.data.subscribe(trips => {
      const counter = new Map();
      for (const trip of trips) {
        const country = trip.country;
        if (!counter.has(country)) {
          counter.set(country, 0);
        }
        counter.set(country, counter.get(country) + 1);
      }
      counter.forEach((value, country, map) => {
        this.data.push([country, value]);
      });
    });
  }

  ngOnInit() {
  }

}
