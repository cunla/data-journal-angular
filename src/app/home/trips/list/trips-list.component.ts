import {Component, OnInit} from '@angular/core';
import {EMPTY_TRIP, TripInterface, TripsService} from '../trips.service';
import {CsvTools} from '../../common/csvtools.service';
import {saveAs} from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-trips',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {
  searchValue = '';
  newTrip: TripInterface = EMPTY_TRIP;

  constructor(public trips: TripsService,
  ) {
  }

  ngOnInit() {
  }

  searchByName() {
    const value = this.searchValue ? this.searchValue.toLowerCase() : '';
    this.trips.init('trips', 'start', {
      reverse: true, prepend: false, searchValue: value,
    });
  }

  exportCsv() {
    this.trips.data.subscribe(res => {
      const tripsCsv = CsvTools.convertToCsv(res,
        ['start', 'end', 'locationName', 'purpose']);
      console.log(tripsCsv);
      const blob = new Blob([tripsCsv], {type: 'text/plain;charset=utf-8'});
      saveAs(blob, 'data.csv');
    });
  }

  calculateDaysPerYear(year: number): Map<string, number> {
    const res = new Map<string, number>();
    this.trips.data.subscribe((trips) => {
      trips.forEach(trip => {
        if (!res.has(trip.location.country)) {
          res.set(trip.location.country, 0);
        }
        const end = moment.min(moment(trip.end), moment([year, 11, 31]));
        const start = moment.max(moment(trip.start), moment([year, 0, 1]));
        const days = end.diff(start);
        res.set(trip.location.country, res.get(trip.location.country) + days);
      });
    });
    return res;
  }
}
