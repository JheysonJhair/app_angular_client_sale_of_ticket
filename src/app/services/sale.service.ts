import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private myAppUrl = 'https://localhost:7282/';
  private myApiInsert = 'sale/insert/';
  constructor(private http: HttpClient) { }

  saveSale(dtoSale: FormData): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert,dtoSale);
  }
}
