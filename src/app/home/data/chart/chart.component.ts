import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  data = [
    ['Location', 'Population'],
    ['Canada', 8136000],
    ['Germany', 8538000],
    ['France', 2244000],
    ['Japan', 3470000],
    ['Russia', 19500000],
  ];
  options = {
    colorAxis: {colors: ['lightgreen', 'blue']}
  };

  constructor() {
  }

  ngOnInit() {
  }

}
