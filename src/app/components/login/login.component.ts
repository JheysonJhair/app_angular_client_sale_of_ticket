import { HttpClient} from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dtoStudent } from 'src/app/interfaces/Student';
import { StudentService } from 'src/app/services/student.service';
import { dtoAdministrator } from 'src/app/interfaces/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public static token:string;//variable para obtener token
  public static idStudent:string;


  public static tokenA:string;//variable para obtener token
  public static idAdministrator:string;
  data: any;//inyectar

  accessLogin: FormGroup;
  id = "";
  idPasar:string = "";
  listStudentAcces: dtoStudent[] = [];
  student: dtoStudent | undefined;
  admin: dtoAdministrator | undefined;

  constructor(private fbl: FormBuilder,
    private _studentService: StudentService,
    private _adminService: AdministratorService,
    private router: Router,
    private aRoute:ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient){

    this.accessLogin = this.fbl.group({
    mail: ['', [Validators.required, Validators.maxLength(6),Validators.minLength(6)]],
    password: ['', Validators.required ],
  })
  this.aRoute.snapshot.paramMap.get('id');
  this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {

  }

  accessStudent(){

      let formData = new FormData();
      formData.append("mail",this.accessLogin.get('mail')?.value);
      formData.append("password",this.accessLogin.get('password')?.value);
      console.log(formData);

      const student: dtoStudent = {
        dni: this.accessLogin.get('')?.value,
        name: this.accessLogin.get('')?.value,
        lastName: this.accessLogin.get('')?.value,
        code: this.accessLogin.get('')?.value,
        sex: this.accessLogin.get('')?.value,
        phone: this.accessLogin.get('')?.value,
        address: this.accessLogin.get('')?.value,
        school: this.accessLogin.get('')?.value,
        faculty: this.accessLogin.get('')?.value,
        mail: this.accessLogin.get('mail')?.value,
        password: this.accessLogin.get('password')?.value,
      }

      if(this.accessLogin.get('mail')?.value.endsWith('@unamba.edu.pe')){
        this._studentService.getLogin(student.mail,student.password).subscribe(data =>{
          this.getStudent(data.codeAdmin);

          LoginComponent.token=data.token;//almacenando token
          LoginComponent.idStudent=data.codeAdmin;

          this.toastr.success('Bienvenido!', 'Acceso!');
          this.router.navigate(['/condition',data.codeAdmin]);
        }, error =>{
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        })
      }else if(this.accessLogin.get('mail')?.value.endsWith('@gmail.com')){
        this._studentService.getLoginAdmin(student.mail,student.password).subscribe(data =>{
          this.getAdmin(data.codeAdmin);

          LoginComponent.tokenA =data.token;//almacenando token
          LoginComponent.idAdministrator=data.codeAdmin;

          this.toastr.success('Bienvenido Administrador!', 'Acceso!');
          this.router.navigate(['/administrator',data.codeAdmin]);
        }, error =>{
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        })
      }
  }
  getStudent(codeAdmin: string){
    this._studentService.getStudent(codeAdmin).subscribe(data =>{
      this.student = data;
    })
  }
  getAdmin(codeAdminN: string){
    this._adminService.getAdmin(codeAdminN).subscribe(data =>{
      this.admin = data;
    })
  }
}
