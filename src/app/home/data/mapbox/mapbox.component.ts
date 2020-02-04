import {Component, OnInit, ViewChild} from '@angular/core';
import {TripInterface, TripsService} from '../../trips/trips.service';
import {CitiesService} from '../../common/cities.service';

@Component({
  selector: 'app-map',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit {
  @ViewChild('map', {static: false}) map;
  trips = [];
  geometry = {
    type: 'LineString',
    coordinates: this.trips,
  };

  constructor(private tripsService: TripsService) {
    tripsService.data.subscribe(trips => {
      const sortedTrips = trips.sort(MapboxComponent.sortByDates);
      // tslint:disable-next-line:forin
      for (const ind in sortedTrips) {
        const countryData = CitiesService.getCountryLngLat(sortedTrips[ind].country);
        if (countryData && countryData) {
          console.log(`Got data for country ${sortedTrips[ind].country}: ${countryData}`);
          this.trips.push(countryData);
        }
      }
      console.log(this.trips);
    });
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

  ngOnInit() {
  }
}
