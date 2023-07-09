import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private myAppUrl = 'https://localhost:7282/';
  private myApiInsert = 'sale/insert/';

  private myUrlGet = 'sale/getall/';
  private myUrlId = 'sale/getbyid?id=';
  constructor(private http: HttpClient) { }

  saveSale(dtoSale: FormData): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert,dtoSale);
  }
  getListSale(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGet);
  }
  getSaleId(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlId + id);
  }
}
