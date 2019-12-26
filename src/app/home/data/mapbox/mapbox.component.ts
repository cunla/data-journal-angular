import {Component, OnInit} from '@angular/core';
import {TripInterface, TripsService} from '../../trips/trips.service';
import {CountriesService} from '../../common/countries.service';
import {Style} from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit {
  style: Style = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }]
  };
  trips = [];

  constructor(private tripsService: TripsService,
              private countriesService: CountriesService) {
    tripsService.data.subscribe(trips => {
      const sortedTrips = trips.sort(MapboxComponent.sortByDates);
      let origin = null;
      // tslint:disable-next-line:forin
      for (const ind in sortedTrips) {
        const countryData = this.countriesService.get(sortedTrips[ind].country);
        if (countryData && countryData[0]) {
          const actual = countryData[0];
          console.log(`Got data for country ${sortedTrips[ind].country}: ${countryData}`);
          if (origin) {
            this.trips.push([origin, actual.reverse()]);
          }
          origin = actual;
        }
      }
      console.log(this.trips);
    });
  }

  ngOnInit() {
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
