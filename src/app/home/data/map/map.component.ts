import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../common/countries.service';
import {TripInterface, TripsService} from '../../trips/trips.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  trips = [];
  displayMap = false;

  constructor(private tripsService: TripsService,
              private countriesService: CountriesService) {
    tripsService.data.subscribe(trips => {
      const sortedTrips = trips.sort(MapComponent.sortByDates);
      for (const ind in sortedTrips) {
          const country = sortedTrips[ind].country;
          const data = this.countriesService.get(country);
          console.log(`country ${country}, latlng: ${data}`);
          if (data !== undefined) {
            this.trips.push(data[0]);
          }

      }
      this.displayMap = true;
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
