import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

  constructor(private http: HttpClient) { }

  public getStatistical(start_date: string, end_date:string, filter_type: string):Observable<any>{
    const api = `http://localhost/angular-api/getPayments.php?start_date=${start_date}&end_date=${end_date}&filter_type=${filter_type}`
    return this.http.get(api);
  }

  public getOrderDetails(start_date: string, end_date:string, filter_type: string):Observable<any>{
    const api = `http://localhost/angular-api/getOrderDetails.php?start_date=${start_date}&end_date=${end_date}&filter_type=${filter_type}`
    return this.http.get(api);
  }

  public getOrderProduct(start_date: string, end_date:string, filter_type: string):Observable<any>{
    const api = `http://localhost/angular-api/getOrderProduct.php?start_date=${start_date}&end_date=${end_date}&filter_type=${filter_type}`
    return this.http.get(api);
  }
}
  