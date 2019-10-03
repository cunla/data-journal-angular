import {Component, OnInit} from '@angular/core';
import {ADDRESS_HISTORY_PATH, AddressInterface, AddressService, EMPTY_ADDRESS} from '../address.service';

@Component({
  selector: 'app-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  searchValue = '';
  newAddress: AddressInterface = EMPTY_ADDRESS;

  constructor(public addressService: AddressService,
  ) {
  }

  ngOnInit() {
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.addressService.init(ADDRESS_HISTORY_PATH, 'start', {
      reverse: true, prepend: false, searchValue: value,
    });
  }

}
