import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {map, startWith} from 'rxjs/operators';
import {AddressInterface, AddressService, EMPTY_ADDRESS} from '../address.service';
import {Dates} from "../../common/dates";
import {COUNTRIES} from "../../common/countries.service";

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  @Input() address: AddressInterface;
  addressForm: FormGroup;
  filteredOptions: Observable<string[][]>;
  nameToIsoMap: Map<string, string>;

  constructor(public addressService: AddressService,
              private fb: FormBuilder,
  ) {
    this.nameToIsoMap = new Map<string, string>(
      COUNTRIES.map(option => [option.name, option.iso.toLowerCase()] as [string, string])
    );
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(value) {
    value.countryCode = this.nameToIsoMap.get(value.country);
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
      country: [this.address.country, Validators.required],
      state: [this.address.state,],
      city: [this.address.city,],
      address: [this.address.address, Validators.required],
      start: [this.address.start, Validators.required],
      end: [this.address.end,],
    },{ validator: Validators.compose([
        Dates.dateLessThanValidator('start', 'end'),
      ])});
    this.filteredOptions = this.addressForm.get('country').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[][] {
    const filterValue = value.toLowerCase();
    return COUNTRIES
      .filter(option => option.name.toLowerCase().indexOf(filterValue) === 0
        || option.iso.toLowerCase().indexOf(filterValue) === 0)
      .map(option => [option.name, option.iso.toLowerCase()]);
  }
}
