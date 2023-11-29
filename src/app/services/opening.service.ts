import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OpeningService {
  private myAppUrl = 'https://localhost:7282/';
  private myUrlGetId = 'Opening/getbyid?id=';
  private myUrlGet = 'Opening/Getall/';
  private myUrlPost = 'Opening/Insert/';

  constructor(private http: HttpClient) { }

  getAllOpening(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGet);
  }

  getOpeningById(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGetId + id);
  }
  insertOpening(dtoOpening: FormData): Observable<any>{
    return this.http.post(this.myAppUrl + this.myUrlPost,dtoOpening);
  }
}
