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
    tripsService.data.subscribe((trips) => {
      addressService.data.subscribe((addresses) => {
        const sortedTrips = trips.sort(TripsChartComponent.sortByDates);
        this.trips = [];
        sortedTrips.forEach((trip: TripInterface) => {
          const originCity = this.findOrigin(addresses, trip);
          const targetCity = this.itemToPoint(trip);
          if (originCity && targetCity && targetCity.lat && targetCity.lon) {
            this.trips.push({origin: originCity, target: targetCity, color: '#00f000'});
          }
        });
        this.ingestedTrips = true;
      });
    });
  }

   ngOnInit(): void {
    // const addresses = await this.addressService.data;
    // const trips = await this.tripsService.data;
    // const sortedTrips = trips.sort(TripsChartComponent.sortByDates);
    // this.trips = [];
    // sortedTrips.forEach((trip: TripInterface) => {
    //   const originCity = this.findOrigin(addresses, trip);
    //   const targetCity = this.itemToPoint(trip);
    //   if (originCity && targetCity && targetCity.lat && targetCity.lon) {
    //     this.trips.push({origin: originCity, target: targetCity, color: '#00f000'});
    //   }
    // });
    // this.ingestedTrips = true;
  }

  private itemToPoint(item: TripInterface | AddressInterface): Point {
    return {
      id: item.city,
      lon: +item.lng,
      lat: +item.lat,
    };
  }

  private findOrigin(addresses: AddressInterface[], trip: TripInterface) {
    if (addresses.length === 0) {
      console.warn('No addresses given, returning null');
      return null;
    }
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
    return this.itemToPoint(addresses[addresses.length - 1]);
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
