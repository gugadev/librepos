import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../animations/fade.animation';

@Component({
  selector: 'app-emission-points',
  templateUrl: './emission-points.component.html',
  styleUrls: ['./emission-points.component.scss'],
  animations: [fadeAnimation]
})
export class EmissionPointsComponent implements OnInit {

  constructor() { }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ngOnInit() {
  }

}
