import {Component, OnInit} from '@angular/core';
import {CountriesService} from "../../common/countries.service";
import {TripInterface, TripsService} from "../../trips/trips.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  style = {
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
      const sortedTrips = trips.sort(MapComponent.sortByDates);
      let origin = {latlng: [0, 0]};
      let data = {latlng: null};
      for (let ind in sortedTrips) {
        this.countriesService.get(sortedTrips[ind].country).subscribe(res => {
          data = <any>res.data();
          if (data !== undefined) {
            this.trips.push([origin.latlng, data.latlng.reverse()]);
            console.log(sortedTrips[ind].country, this.trips);
          }
        });
      }

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
