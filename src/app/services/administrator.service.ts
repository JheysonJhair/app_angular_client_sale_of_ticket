import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  private myAppUrl = 'https://localhost:7282/';
  private myUrlGetId = 'administrator/getbyid?id=';

  private myUrlPut = 'opening/update/';
  private myUrlGetIdOpe = 'opening/getbyid?id=';
  private myUrlGetIdPeriod = 'period/getbyid?id=';

  private myUrlGet = 'sale/getsale/';
  constructor(private http: HttpClient) { }

  getAdmin(id: string): Observable<any>{
    const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + LoginComponent.token
  });
  return this.http.get(this.myAppUrl + this.myUrlGetId + id, { headers });
  }

  getOpening(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGetIdOpe + id);
  }
  updateOpening(dtoOpening: FormData ): Observable<any>{
    return this.http.post(this.myAppUrl + this.myUrlPut, dtoOpening);
  }
  getPeriod(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGetIdPeriod + id);
  }

  getSaleDetail(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGet);
  }
}
