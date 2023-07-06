import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private myAppUrl = 'https://localhost:7282/';
  private myUrlGet = 'student/getall/';
  private myApiInsert = 'student/insert/';
  private myUrlDelete = 'student/delete?idestudent=';
  private myUrlPut = 'student/update/';
  private myUrlLoginMail = 'student/login?mail=';
  private myUrlLoginPass = '&password=';
  private myUrlLoginMailAdmin = 'administrator/login?mail=';
  private myUrlLoginPassAdmin = '&password=';
  private myUrlGetId = 'student/getbyid?id=';


  constructor(private http: HttpClient) { }

  getListStudent(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlGet);
  }
  deleteStudent(id: string): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myUrlDelete + id)
  }
  saveStudent(dtoStudent: FormData): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiInsert,dtoStudent);
  }
  getStudent(id: string): Observable<any>{
    const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + LoginComponent.token
  });
  return this.http.get(this.myAppUrl + this.myUrlGetId + id, { headers });
  }
  updateStudent(dtoStudent: FormData ): Observable<any>{
    return this.http.post(this.myAppUrl + this.myUrlPut, dtoStudent);
  }
  getLogin(mail: any, pass: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlLoginMail + mail + this.myUrlLoginPass + pass);
  }
  getLoginAdmin(mail: any, pass: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myUrlLoginMailAdmin + mail + this.myUrlLoginPassAdmin + pass);
  }
}
