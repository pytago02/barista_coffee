import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private urlApi = 'http://localhost:10093/api/dashboard';
  constructor() { }

}
