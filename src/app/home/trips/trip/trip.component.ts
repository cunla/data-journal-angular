import {Component, Input, OnInit} from '@angular/core';
import {TripInterface, TripsService} from '../trips.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  @Input() trip: TripInterface;
  daysDiff = TripComponent.daysDiffFunc;

  constructor(private trips: TripsService) {
  }

  static daysDiffFunc(date1: Date, date2: Date): number {
    date2 = date2 ? date2 : new Date();
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  ngOnInit() {
  }

  delete() {
    this.trips.delete(this.trip.id).then(
      () => {
        this.trips.refresh();
      }, err => {
        console.log(err);
      });
  }
}
