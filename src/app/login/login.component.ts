import { Component } from '@angular/core';
import { AuthService } from '../sevices/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'; // Thêm JwtHelperService

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private jwtHelper: JwtHelperService // Thêm JwtHelperService vào constructor
  ) { }

  public onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          console.log(response);
          // Lưu token JWT vào localStorage
          this.authService.saveToken(response.token);

          // Giải mã token để lấy role
          const decodedToken = this.jwtHelper.decodeToken(response.token);

          // Điều hướng đến dashboard hoặc trang chủ dựa trên vai trò
          if (decodedToken.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Đã xảy ra lỗi khi cố gắng đăng nhập';
      }
    });
  }
}
