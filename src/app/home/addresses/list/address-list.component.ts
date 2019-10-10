import {Component, OnInit} from '@angular/core';
import {ADDRESS_HISTORY_PATH, AddressInterface, AddressService, EMPTY_ADDRESS} from '../address.service';
import {CsvTools} from '../../common/csvtools.service';
import {saveAs} from 'file-saver';

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
  exportCsv() {
    this.addressService.data.subscribe(res => {
      const tripsCsv = CsvTools.convertToCsv(res,
        ['start', 'end', 'country', 'state', 'city', 'address']);
      console.log(tripsCsv);
      const blob = new Blob([tripsCsv], {type: 'text/plain;charset=utf-8'});
      saveAs(blob, 'data.csv');
    });
  }
}
