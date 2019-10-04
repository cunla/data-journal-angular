import {Component, Input, OnInit} from '@angular/core';
import {AddressInterface, AddressService} from '../address.service';
import {TripComponent} from '../../trips/trip/trip.component';
import {Dates} from "../../common/dates";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() address: AddressInterface;
  daysDiff = Dates.daysDiffFunc;

  constructor(private addressService: AddressService) {
  }

  ngOnInit() {
  }

  delete() {
    this.addressService.delete(this.address.id).then(
      () => {
        this.addressService.refresh();
      }, err => {
        console.log(err);
      });
  }

}
