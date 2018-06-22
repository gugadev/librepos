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
    this.generateMenu();
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

  private generateMenu(): void {
    this.menus = [
      {
        path: '/users',
        name: 'Usuarios',
        icon: 'people'
      },
      {
        path: '/zones',
        name: 'Zonas',
        icon: 'store'
      },
      {
        path: '/services',
        name: 'Servicios',
        icon: 'dashboard'
      },
      {
        path: '/orders',
        name: 'Ventas',
        icon: 'local_atm'
      },
      {
        path: '/queries',
        name: 'Consultas',
        icon: 'search'
      },
      {
        path: '/reports',
        name: 'Reportes',
        icon: 'pie_chart'
      },
      {
        path: '/settings',
        name: 'Ajustes',
        icon: 'settings'
      }
    ];
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
        const notAllowedModules = ['/users', '/services', '/zones', '/settings'];
        this.menus = this.menus.filter(menu => !notAllowedModules.includes(menu.path));
        break;
      }
      case 'contabilidad': {
        const notAllowedModules = ['/users', '/services', '/zones', 'orders', '/settings'];
        this.menus = this.menus.filter(menu => !notAllowedModules.includes(menu.path));
        break;
      }
    }
  }
}
