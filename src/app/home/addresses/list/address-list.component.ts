import {Component, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  address: Object;
  formattedAddress: string;

  constructor(public zone: NgZone) {
  }

  ngOnInit() {
  }

  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }
}
