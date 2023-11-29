import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private myAppUrl = 'https://localhost:7282/';
  private myUrlGetId = 'Period/getbyid?id=';
  private myUrlGet = 'Period/Getall/';
  private myUrlPost = 'Period/Insert/';

  constructor(private http: HttpClient) { }

  getAllPeriod(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGet);
  }

  getPeriodById(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGetId + id);
  }
  insertPeriod(dtoPeriod: FormData): Observable<any>{
    return this.http.post(this.myAppUrl + this.myUrlPost,dtoPeriod);
  }
}
