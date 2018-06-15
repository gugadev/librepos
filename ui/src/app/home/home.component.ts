import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../animations/fade.animation';
import { HomeService } from './home.service';
import { User } from '../users/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeAnimation]
})
export class HomeComponent implements OnInit {
  private menus: Array<any> = [];
  private user: User = new User();
  private company: string;
  private showUserMenu: boolean;
  private makeSidebarSmall: Boolean = true;

  constructor(
    private router: Router,
    private service: HomeService) {
    this.menus.push({
      path: '/users',
      name: 'Usuarios',
      icon: 'people'
    });
    this.menus.push({
      path: '/emission_points',
      name: 'Puntos E.',
      icon: 'store'
    });
    this.menus.push({
      path: '/services',
      name: 'Servicios',
      icon: 'dashboard'
    });
    this.menus.push({
      path: '/orders',
      name: 'Ventas',
      icon: 'local_atm'
    });
    this.menus.push({
      path: '/queries',
      name: 'Consultas',
      icon: 'search'
    });
    this.menus.push({
      path: '/reports',
      name: 'Reportes',
      icon: 'pie_chart'
    });
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  private toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  private toggleSidebar(): void {
    this.makeSidebarSmall = !this.makeSidebarSmall;
  }

  private logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  async ngOnInit() {
    this.company = 'Company';
    this.user = await this.service.checkAuth();
    switch (this.user.role.name.toLowerCase()) {
      case 'administrador': {
        // nothing
        break;
      }
      case 'ventas': {
        const notAllowedModules = ['Users', 'Services', 'Counters'];
        this.menus = this.menus.filter(menu => !notAllowedModules.includes(menu.name));
        break;
      }
      case 'contabilidad': {
        const notAllowedModules = ['Users', 'Services', 'Counters', 'Orders'];
        this.menus = this.menus.filter(menu => !notAllowedModules.includes(menu.name));
        break;
      }
    }
  }
}
