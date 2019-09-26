import {Component, Input, OnInit} from '@angular/core';
import {TripInterface, TripsService} from '../trips.service';
// import * as firebase from 'firebase/app';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  @Input() trip: TripInterface;

  constructor(private trips: TripsService) {
  }

  daysDiff(t1: Timestamp, t2: Timestamp): number {
    const date1 = t1.toDate();
    const date2 = t2 ? t2.toDate() : new Date();
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
