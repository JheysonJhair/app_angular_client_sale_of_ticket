import { Router } from '@angular/router';
import { Component} from '@angular/core';
@Component({
  selector: 'app-navbar-administrator',
  templateUrl: './navbar-administrator.component.html',
  styleUrls: ['./navbar-administrator.component.css']
})
export class NavbarAdministratorComponent {
  notificacionesCount: number = 0;
  notificaciones: any[] = [];
  showNotifications: boolean = false;

  constructor(private router: Router) {}

  handleChangePassword() {
    this.router.navigate(['/pass']);
  }

  handleLogout() {
    this.router.navigate(['/']);
  }
}
