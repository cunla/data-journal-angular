import {Component, Input, OnInit} from '@angular/core';
import {EMPTY_TRIP, TripInterface, TripsService} from '../trips.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {countries} from 'typed-countries';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent implements OnInit {
  @Input() trip: TripInterface;
  tripForm: FormGroup;
  filteredOptions: Observable<string[][]>;
  nameToIsoMap: Map<string, string>;

  constructor(public trips: TripsService,
              private fb: FormBuilder,
  ) {
    this.nameToIsoMap = new Map<string, string>(
      countries.map(option => [option.name, option.iso.toLowerCase()] as [string, string])
    );
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(value) {
    value.countryCode = this.nameToIsoMap.get(value.country);
    if (this.trip.id === null || this.trip.id === undefined) {
      console.log('Saving trip', value);
      this.trips.create(value).then(
        res => {
          this.trips.refresh();
          this.trip = EMPTY_TRIP;
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
      country: [this.trip.country, Validators.required],
      state: [this.trip.state,],
      city: [this.trip.city,],
      purpose: [this.trip.purpose, Validators.required],
      start: [this.trip.start, Validators.required],
      end: [this.trip.end,],
    });
    this.filteredOptions = this.tripForm.get('country').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[][] {
    const filterValue = value.toLowerCase();
    return countries
      .filter(option => option.name.toLowerCase().indexOf(filterValue) === 0
        || option.iso.toLowerCase().indexOf(filterValue) === 0)
      .map(option => [option.name, option.iso.toLowerCase()]);
  }
}
