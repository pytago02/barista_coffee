import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://localhost:10093/api/auth/login';
  private apiUrl = 'http://localhost/angular-api/login.php';

  constructor(private http: HttpClient) { }

  // public login(username: string, password: string): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, { username, password });
  // }

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  public saveToken(token: string): void {
    localStorage.setItem('accessToken', token); // Lưu token vào localStorage
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken'); // Lấy token từ localStorage
  }

  public isAuthenticated(): boolean {
    // Kiểm tra xem token có tồn tại không
    const token = this.getToken();
    return token != null;
  }

  public logout(): void {
    localStorage.removeItem('accessToken'); // Xóa token khi đăng xuất
  }
}
