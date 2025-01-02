import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http : HttpClient) { }

  public getMenu(): Observable<any[]> {
      const api = `http://localhost/angular-api/getFile.php`;
      return this.http.get<any[]>(api);
    }
  
    public addMenuItem(item: any): Observable<any> {
      const url = 'http://localhost/angular-api/uploadFile.php';
      return this.http.post<any>(url, item);
    }
  
}
