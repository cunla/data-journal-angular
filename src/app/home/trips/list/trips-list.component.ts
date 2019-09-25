import {Component, OnInit} from '@angular/core';
import {EMPTY_TRIP, TripInterface, TripsService} from '../trips.service';

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
    const value = this.searchValue.toLowerCase();
    this.trips.init('trips', 'start', {
      reverse: false, prepend: false, searchValue: value,
    });
  }

}
