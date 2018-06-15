import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../animations/fade.animation';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fadeAnimation]
})
export class UsersComponent implements OnInit {

  constructor() { }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ngOnInit() {
  }

}
