import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {map, startWith} from 'rxjs/operators';
import {AddressInterface, AddressService} from '../address.service';
import {Dates} from '../../common/dates';
import {CitiesService, LocationInterface} from '../../common/cities.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  @Input() address: AddressInterface;
  addressForm: FormGroup;
  filteredOptions: Observable<any[]>;
  _filter = CitiesService.filterCities;

  constructor(public addressService: AddressService,
              private fb: FormBuilder,) {

  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(value) {
    const location: LocationInterface = CitiesService.filterLocation(value.locationName);
    value.city = location.city;
    value.state = location.state;
    value.country = location.country;
    value.countryCode = location.iso2;
    value.lat = location.lat;
    value.lng = location.lng;
    value.start = moment(value.start).toDate();
    value.end = value.end ? moment(value.end).toDate() : value.end;
    if (this.address.id === null || this.address.id === undefined) {
      console.log('Saving address', value);
      this.addressService.create(value).then(
        res => {
          this.addressService.refresh();
          this.addressForm.reset();
        }
      );
    } else {
      this.addressService.update(this.address.id, value).then(
        () => {
          this.address.editMode = false;
          this.addressService.refresh();
        }
      );
    }
  }

  private createForm() {
    this.addressForm = this.fb.group({
      locationName: [this.address.locationName, Validators.required],
      address: [this.address.address, Validators.required],
      start: [this.address.start, Validators.required],
      end: [this.address.end,],
    }, {
      validator: Validators.compose([
        Dates.dateLessThanValidator('start', 'end'),
      ])
    });
    this.filteredOptions = this.addressForm.get('locationName').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
}
