import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(public http: HttpClient) {}

  // Hàm gọi API để lấy menu theo category_id
  public getMenu(category_id: number): Observable<any[]> {
    const url = `http://localhost/angular-api/getMenu.php?category_id=${category_id}`;
    return this.http.get<any[]>(url);
  }  

  // Hàm thêm item vào menu
  public addMenuItem(item: any): Observable<any> {
    const url = 'http://localhost/angular-api/add_menu_item.php';
    return this.http.post<any>(url, item);
  }

  // Hàm xóa item khỏi menu
  public deleteMenuItem(item_id: number): Observable<any> {
    const url = `http://localhost/angular-api/deleteItemMenu.php?item_id=${item_id}`;
    return this.http.delete<any>(url);
  }

  // Hàm cập nhật item trong menu
  public updateMenuItem(item: any): Observable<any> {
    const url = `http://localhost/angular-api/updateItemMenu.php`;
    return this.http.put<any>(url, item);
  }
}
