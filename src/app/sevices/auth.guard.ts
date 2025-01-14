import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';  // Cài đặt thư viện giúp giải mã JWT

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);

      // Kiểm tra role của người dùng
      if (decodedToken.role === 'admin') {
        return true;
      } else {
        this.router.navigate(['/login']); // Chuyển hướng nếu không phải admin
        return false;
      }
    } else {
      this.router.navigate(['/login']); // Nếu không có token hoặc token hết hạn
      return false;
    }
  }
}
