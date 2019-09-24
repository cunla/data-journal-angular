import {Component, OnInit} from '@angular/core';
import {EMPTY_TRIP, TripInterface, TripsService} from '../trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {

  searchValue: string = '';
  newTrip: TripInterface = EMPTY_TRIP;
  items: Array<any>;
  name_filtered_items: Array<any>;


  constructor(public trips: TripsService,
  ) {
  }

  ngOnInit() {
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.trips.init('trips', 'country', {
      reverse: false, prepend: false, searchValue: value,
    });
  }

}
