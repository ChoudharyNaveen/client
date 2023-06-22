import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  addAlarm(data: any): Observable<any> {
    return this._http.post('http://localhost:4050/alarm/alarm', data);
  }

  updateAlarm(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:4050/alarm/alarm/${id}`, data);
  }

  getAlarmLists(site: string): Observable<any> {
    return this._http.get(`http://localhost:4050/alarm/alarm/${site}`);
  }

  deleteAlarm(id: number): Observable<any> {
    return this._http.delete(`http://localhost:4050/alarm/alarm/${id}`);
  }
}
