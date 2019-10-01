import {Component, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  address: Object;
  formattedAddress: string;

  constructor(public zone: NgZone) {
  }

  ngOnInit() {
  }


}
