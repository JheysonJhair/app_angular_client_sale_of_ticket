import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  handleChangePassword() {
    // Navegar a la ruta /pass
    this.router.navigate(['/pass']);
  }

  handleLogout() {
    // Navegar a la ruta /
    this.router.navigate(['/']);
  }
}