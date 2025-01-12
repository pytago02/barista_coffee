import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private http : HttpClient) { }



  public getTables(floor: number, status: number):Observable<any[]>{
    const apiUrl = `http://localhost/angular-api/getTables.php?floor=${floor}&status=${status}`;
    return this.http.get<any[]>(apiUrl);
  }

  public getFloors():Observable<any[]>{
    const apiUrl = `http://localhost/angular-api/getTablesFloor.php`;
    return this.http.get<any[]>(apiUrl);
  }

  public getStatuss():Observable<any[]>{
    const apiUrl = `http://localhost/angular-api/getTablesStatus.php`;
    return this.http.get<any[]>(apiUrl);
  }

  public addTable(formData: FormData): Observable<any> {
    const url = 'http://localhost/angular-api/addTables.php';
    return this.http.post<any>(url, formData);
  }

  public updateTable(item: FormData): Observable<any> {
    const url = `http://localhost/angular-api/updateTables.php`;
    return this.http.put<any>(url, item);
  }

  public deleteTables(table_id: number): Observable<any> {
    const url = `http://localhost/angular-api/deleteTables.php?table_id=${table_id}`;
    return this.http.delete<any>(url);
  }

  
}
