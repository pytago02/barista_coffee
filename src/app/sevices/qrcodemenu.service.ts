import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QrcodemenuService {
  constructor(private http: HttpClient) {}

  public addOrder(item: any): Observable<any> {
    const url = 'http://localhost/angular-api/addOrderQrCode.php';
    return this.http.post<any>(url, item);
  }
}
