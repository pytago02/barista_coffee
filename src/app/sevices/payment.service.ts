import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public payment(item: any):Observable<any>{
    const apiURL = 'http://localhost/angular-api/payment.php';
    return this.http.post<any>(apiURL, item);
  }

  public updateStatusOrder(item: any): Observable<any> {
    const url = `http://localhost/angular-api/updateOrder.php`;
    return this.http.put<any>(url, item);
  }
}
