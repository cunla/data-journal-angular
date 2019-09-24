import {Component, Input, OnInit} from '@angular/core';
import {TripInterface, TripsService} from '../trips.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  @Input() trip: TripInterface;

  constructor(private trips: TripsService) {
  }

  ngOnInit() {
  }

  delete() {
    this.trips.delete(this.trip.id).then(
      () => {
      }, err => {
        console.log(err);
      });
  }
}
