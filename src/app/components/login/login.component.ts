import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dtoStudent } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';
import { dtoAdministrator } from 'src/app/interfaces/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public static token: string;
  public static idStudent: string;
  public static idAdministrator: string;
  data: any;

  accessLogin: FormGroup;
  id = '';
  idPasar: string;
  listStudentAcces: dtoStudent[];
  student: dtoStudent | undefined;
  admin: dtoAdministrator | undefined;

  constructor(
    private formBuil: FormBuilder,
    private _studentService: StudentService,
    private _adminService: AdministratorService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.accessLogin = this.formBuil.group({
      mail: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\d{6}@unamba\.edu\.pe|.*@gmail\.com)$/),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
    this.aRoute.snapshot.paramMap.get('id');
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  // ---------------------------------------------------- GET ADMIN AND STUDENT
  getStudent(id: string) {
    this._studentService.getStudent(id).subscribe((data) => {
      this.student = data;
    });
  }
  getAdmin(id: string) {
    this._adminService.getAdmin(id).subscribe((data) => {
      this.admin = data;
    });
  }

  // ---------------------------------------------------- ACCESS
  accesoStudentAdmin() {
    let formData = new FormData();
    formData.append('mail', this.accessLogin.get('mail')?.value);
    formData.append('password', this.accessLogin.get('password')?.value);

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
    };

    if (this.accessLogin.get('mail')?.value.endsWith('@unamba.edu.pe')) {
      this._studentService.getLogin(student.mail, student.password).subscribe(
        (data) => {
          console.log(data);
          this.getStudent(data.codeAdmin);

          LoginComponent.token = data.token;
          LoginComponent.idStudent = data.codeAdmin;

          this.toastr.success('Bienvenido!', 'Acceso!');
          this.router.navigate(['/condition', data.codeAdmin]);
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
    } else if (this.accessLogin.get('mail')?.value.endsWith('@gmail.com')) {
      this._studentService
        .getLoginAdmin(student.mail, student.password)
        .subscribe(
          (data) => {
            this.getAdmin(data.codeAdmin);

            LoginComponent.token = data.token;
            LoginComponent.idAdministrator = data.codeAdmin;

            this.toastr.success('Bienvenido Administrador!', 'Acceso!');
            this.router.navigate(['/administrator', data.codeAdmin]);
          },
          (error) => {
            this.toastr.error('Opss ocurrio un error', 'Error');
            console.log(error);
          }
        );
    }
  }
}
