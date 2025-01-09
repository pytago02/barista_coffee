import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  public getOder(table_id: number): Observable<any[]> {
    const api = `http://localhost/angular-api/getOders.php?table_id=${table_id}`;
    return this.http.get<any[]>(api);
  }

  public addOrderDetail(item: any): Observable<any> {
    const url = 'http://localhost/angular-api/addOderDetail.php';
    return this.http.post<any>(url, item);
  }

  public openTable(table_id: number): Observable<any> {
    const url = `http://localhost/angular-api/openTable.php`;
    return this.http.post<any>(url, {table_id});
  }
}
