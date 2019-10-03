import {Component, Input, OnInit} from '@angular/core';
import {AddressInterface, AddressService} from '../address.service';
import {TripComponent} from '../../trips/trip/trip.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() address: AddressInterface;
  daysDiff = TripComponent.daysDiffFunc;

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
