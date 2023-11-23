import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  notificacionesCount: number = 0;
  notificaciones: any[] = [];
  showNotifications: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.notificaciones = [
      { mensaje: 'Notificación de gmail.' },
      { mensaje: 'Su compra esta en proceso...' },
    ];

    this.notificacionesCount = this.notificaciones.length;
  }

  handleNotificacionesClick(event: Event) {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
  }

  handleSubMenuClick(mensaje: string) {
    if (mensaje === this.notificaciones[0].mensaje) {
      window.open('https://mail.google.com/mail/u/1/#inbox', '_blank');
    } else {
      console.log(`Clic en notificación: ${mensaje}`);
    }
  }

  handleChangePassword() {
    this.router.navigate(['/pass']);
  }

  handleLogout() {
    this.router.navigate(['/']);
  }
}
