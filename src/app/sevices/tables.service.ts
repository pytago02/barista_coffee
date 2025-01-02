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

  
}
