import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myAppUrl = 'https://localhost:7282/';
  private myUrlGetId = 'product/getbyid?id=';
  private myUrlGetFecha = 'period/getbyid?id=';
  private myUrlGet = 'product/getall/';

  constructor(private http: HttpClient) { }

  getListProduct(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGet);
  }

  getProduct(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGetId + id);
  }
  getFecha(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGetFecha + id);
  }
}

