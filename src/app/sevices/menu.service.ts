import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private api: string = 'http://localhost:10093/api/menu-items';
  constructor(public http: HttpClient) {}

  /*
  // Hàm gọi API để lấy menu theo category_id
  public getMenu1(category_id: number): Observable<any[]> {
    let accessToken: string | null = null;
  
    // Ensure localStorage is only accessed in the browser
    if (typeof window !== 'undefined' && localStorage) {
      accessToken = localStorage.getItem('accessToken');
    }
  
    const headers = new HttpHeaders({
      'Authorization': accessToken ? `Bearer ${accessToken}` : ''
    });
  
    // const url = `http://localhost/angular-api/getMenu.php?category_id=${category_id}`;
    return this.http.get<any[]>(this.api, { headers }).pipe(
      map(res => res)
    );
  }
  
  // Hàm thêm item vào menu
  public addMenuItem1(item: any): Observable<any> {
    let accessToken: string | null = null;
  
    // Ensure localStorage is only accessed in the browser
    if (typeof window !== 'undefined' && localStorage) {
      accessToken = localStorage.getItem('accessToken');
    }
  
    const headers = new HttpHeaders({
      'Authorization': accessToken ? `Bearer ${accessToken}` : ''
    });
    console.log(item);
    // const url = 'http://localhost/angular-api/add_menu_item.php';
    return this.http.post<any>(this.api, item, {headers});
  }
  */

  public getMenu(category_id: number, status:number): Observable<any[]> {
    const api = `http://localhost/angular-api/getMenu.php?category_id=${category_id}&status=${status}`;
    return this.http.get<any[]>(api);
  }

  public addMenuItem(formData: FormData): Observable<any> {
    const url = 'http://localhost/angular-api/add_menu_item.php';
    return this.http.post<any>(url, formData);
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

  public getMenuCategories(): Observable<any[]> {
    const api = `http://localhost/angular-api/getMenuCategories.php`;
    return this.http.get<any[]>(api);
  }

  public getMenuItem(category_id: number, status:number, min:any, max:any, keyword:string){
    const api = `http://localhost/angular-api/getShops.php?category_id=${category_id}&status=${status}&min=${min}&max=${max}&keyword=${keyword}`;
    return this.http.get<any[]>(api);
  }


}
