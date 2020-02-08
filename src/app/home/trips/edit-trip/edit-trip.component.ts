import {Component, Input, OnInit} from '@angular/core';
import {TripInterface, TripsService} from '../trips.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import {Dates} from '../../common/dates';
import {CitiesService} from '../../common/cities.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent implements OnInit {
  @Input() trip: TripInterface;
  tripForm: FormGroup;
  filteredOptions: Observable<any[]>;
  _filter = CitiesService.filterCities;

  constructor(public trips: TripsService,
              private fb: FormBuilder,) {
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(value) {
    value.location = CitiesService.filterLocation(value.locationName);
    value.start = moment(value.start).toDate();
    value.end = value.end ? moment(value.end).toDate() : value.end;
    if (this.trip.id === null || this.trip.id === undefined) {
      console.log('Saving trip', value);
      this.trips.create(value).then(
        res => {
          this.trips.refresh();
          this.tripForm.reset();
        }
      );
    } else {
      this.trips.update(this.trip.id, value).then(
        () => {
          this.trip.editMode = false;
          this.trips.refresh();
        }
      );
    }
  }

  private createForm() {
    this.tripForm = this.fb.group({
      location: [this.trip.location,],
      locationName: [this.trip.locationName, Validators.required],
      purpose: [this.trip.purpose, Validators.required],
      start: [this.trip.start, Validators.required],
      end: [this.trip.end,],
    }, {
      validator: Validators.compose([
        Dates.dateLessThanValidator('start', 'end'),
      ])
    });
    this.filteredOptions = this.tripForm.get('locationName').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
}
