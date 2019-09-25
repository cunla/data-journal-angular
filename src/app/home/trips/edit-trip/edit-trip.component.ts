import {Component, Input, OnInit} from '@angular/core';
import {TripInterface, TripsService} from '../trips.service';
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
  filteredOptions: Observable<string[]>;

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
          this.trips.refresh();
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
      purpose: [this.trip.purpose, Validators.required],
      start: [this.trip.start ? this.trip.start.toDate() : null, Validators.required],
      end: [this.trip.end ? this.trip.start.toDate() : null, Validators.required],
    });
    this.filteredOptions = this.tripForm.get('country').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return countries
      .filter(option => option.name.toLowerCase().indexOf(filterValue) === 0
        || option.iso.toLowerCase().indexOf(filterValue) === 0)
      .map(option => option.name);
  }
}
