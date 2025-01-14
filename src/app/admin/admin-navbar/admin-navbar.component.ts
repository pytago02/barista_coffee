import { Component } from '@angular/core';
import { AuthService } from '../../sevices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: false,
  
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  constructor(private authService : AuthService, private router: Router){}

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Điều hướng về trang đăng nhập
  }
}
