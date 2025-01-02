import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private api: string = "http://localhost:10093/api/menu-categories";

  constructor(public http: HttpClient) {}

  // Function to fetch menu categories by IDs
  public getByIds(category_ids: number[]): Observable<any[]> {
    let accessToken: string | null = null;

    // Ensure localStorage is only accessed in the browser
    if (typeof window !== 'undefined' && localStorage) {
      accessToken = localStorage.getItem('accessToken');
    }

    // Set headers with Authorization token
    const headers = new HttpHeaders({
      'Authorization': accessToken ? `Bearer ${accessToken}` : ''
    });

    // Convert category_ids to a comma-separated string
    const include = category_ids.join(',');

    // Use HttpParams to append query parameters
    const params = new HttpParams()
      .set('include', include)
      .set('include_by', 'category_id');

    // Make the HTTP GET request
    return this.http.get<any[]>(this.api, { headers, params }).pipe(
      map(res => res) // Optional: Transform response if needed
    );
  }
}
