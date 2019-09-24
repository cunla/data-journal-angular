import {Component, Input, OnInit} from '@angular/core';
import {TripInterface, TripsService} from '../trips.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent implements OnInit {
  @Input() trip: TripInterface;
  tripForm: FormGroup;

  constructor(public trips: TripsService,
              private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(value) {
    if (this.trip.id === null || this.trip.id === undefined) {
      this.trips.create(value).then(
        res => {
        }
      );
    } else {
      this.trips.update(this.trip.id, value).then(
        () => {
          this.trip.editMode = false;
        }
      );
    }
  }

  private createForm() {
    this.tripForm = this.fb.group({
      country: [this.trip.country, Validators.required],
      purpose: [this.trip.purpose, Validators.required],
      start: [this.trip.start ? this.trip.start.toDate() : null, Validators.required],
      end: [this.trip.end ? this.trip.start.toDate() : null, Validators.required],
    });
  }
}
