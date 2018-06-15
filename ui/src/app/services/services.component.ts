import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../animations/fade.animation';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  animations: [fadeAnimation]
})
export class ServicesComponent implements OnInit {

  constructor() { }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ngOnInit() {
  }

}
