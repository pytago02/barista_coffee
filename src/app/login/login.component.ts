import { Component } from '@angular/core';
import { AuthService } from '../sevices/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public username: string =  '';
  public password: string =  '';
  public errorMessage: string =  '';

  constructor(private authService: AuthService, private router: Router) { }

  public onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response)=>{
        if (response.status === 'success') {
          if (response.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        }else {
          this.errorMessage  = response.message;
        }
      },
      error:(error:HttpErrorResponse)=>{
        this.errorMessage = 'Đã xảy ra lỗi khi cố gắng đăng nhập';
      }
    }
      
    );
  }
}