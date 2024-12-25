import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  constructor(public http: HttpClient) { }

  public getMenu(): Observable<any[]> {
    const url = 'http://localhost/angular-api/getMenu.php';
    return this.http.get<any[]>(url);
  }

  public addMenuItem(item: any): Observable<any> {
    const url = 'http://localhost/angular-api/add_menu_item.php';
    return this.http.post<any>(url, item);
  }

  public deleteMenuItem(item_id: number): Observable<any> {
    const url = `http://localhost/angular-api/deleteItemMenu.php?item_id=${item_id}`;
    return this.http.delete<any>(url);
  }

  public updateMenuItem(item: any): Observable<any> {
    const url = `http://localhost/angular-api/updateItemMenu.php`;
    return this.http.put<any>(url, item);
  }
}
