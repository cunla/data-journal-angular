import {Component, OnInit} from '@angular/core';
import {TripInterface, TripsService} from "../../trips/trips.service";
import {AddressInterface, AddressService} from "../../addresses/address.service";
import {ArcInterface, Point} from "../mapchart-arcs/mapchart-arcs.component";

@Component({
  selector: 'app-trips-chart',
  templateUrl: './trips-chart.component.html',
  styleUrls: ['./trips-chart.component.scss']
})
export class TripsChartComponent implements OnInit {

  trips: Array<ArcInterface> = [];
  ingestedTrips = false;

  constructor(private tripsService: TripsService,
              private addressService: AddressService) {
    this.addressService.data.subscribe((addresses) => {
      this.tripsService.data.subscribe((trips) => {
        const sortedTrips = trips.sort(TripsChartComponent.sortByDates);
        // tslint:disable-next-line:forin
        for (const ind in sortedTrips) {
          const originCity = this.findOrigin(addresses, sortedTrips[ind]);
          const targetCity = this.itemToPoint(sortedTrips[ind]);
          if (targetCity && targetCity.lat && targetCity.lon) {
            this.trips.push({origin: originCity, target: targetCity});
            // this.addTripIfRelevant(tripsArray, originCity, targetCity);
          }
        }
        this.ingestedTrips = true;
      });
    });
  }

  ngOnInit(): void {

  }

  private itemToPoint(item: TripInterface | AddressInterface): Point {
    return {
      id: item.city,
      lon: +item.lng,
      lat: +item.lat,
    };
  }

  private findOrigin(addresses: AddressInterface[], trip: TripInterface) {
    let ind = 0;
    while (ind < addresses.length) {
      if (addresses[ind].start <= trip.start &&
        (!addresses[ind].end || addresses[ind].end >= trip.end)) {
        const res = this.itemToPoint(addresses[ind]);
        // console.log(`Found address ${ind}: ${res.id} for trip ${trip.city}`);
        return res;
      }
      ++ind;
    }
    console.warn('returning last address or no addresses in list');
    return (addresses.length === 0) ? null : this.itemToPoint(addresses[addresses.length - 1]);
  }


  private static sortByDates(a: TripInterface, b: TripInterface) {
    if (a.start > b.start) {
      return 1;
    } else if (a.start < b.start) {
      return -1;
    } else {
      return 0;
    }
  }
}
