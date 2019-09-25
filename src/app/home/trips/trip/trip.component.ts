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

  daysDiff(date1: Date, date2: Date): number {
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
