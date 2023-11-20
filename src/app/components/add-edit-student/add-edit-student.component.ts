import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dtoStudent } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';
import { AdministratorService } from 'src/app/services/administrator.service';
import { dtoAdministrator } from 'src/app/interfaces/administrator';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css'],
})
export class AddEditStudentComponent implements OnInit {
  addStudent: FormGroup;
  admin: dtoAdministrator[] | undefined;
  accion = 'Registrar';
  id = '';
  str2 = null;
  dtoStudent: dtoStudent | undefined;

  constructor(
    private fb: FormBuilder,
    private _studentService: StudentService,
    private router: Router,
    private _administratorService: AdministratorService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addStudent = this.fb.group({
      dni: [
        '',
        [Validators.required, Validators.maxLength(8), Validators.minLength(8)],
      ],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      school: ['', Validators.required],
      faculty: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      address: ['', [Validators.required]],
      sex: [
        '',
        [Validators.required, Validators.maxLength(1), Validators.minLength(1)],
      ],
      code: [
        '',
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)],
      ],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
    console.log(this.id)
  }
  ngOnInit(): void {
    this.esEdit();
    this.getAdmin();
  }

  //------------------------------------------------------GET -ADMIN - SALE- LISTSALE - STUDENT
  getAdmin() {
    this._administratorService.getAdmin(this.id).subscribe((data) => {
      this.admin = data;
      console.log(data);
    });
  }
  esEdit() {
    if (this.id !== this.str2) {
      this.accion = 'Editar';
      this._studentService.getStudent(this.id).subscribe(
        (data) => {
          this.dtoStudent = data;

          this.addStudent.controls['name'].setValue(data[0].name);
          this.addStudent.controls['dni'].setValue(data[0].dni);
          this.addStudent.controls['lastName'].setValue(data[0].lastName);
          this.addStudent.controls['phone'].setValue(data[0].phone);
          this.addStudent.controls['address'].setValue(data[0].address);
          this.addStudent.controls['school'].setValue(data[0].school);
          this.addStudent.controls['faculty'].setValue(data[0].faculty);
          this.addStudent.controls['sex'].setValue(data[0].sex);
          this.addStudent.controls['code'].setValue(data[0].code);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  addEditStudent() {
    if (this.dtoStudent == undefined) {
      let formData = new FormData();
      formData.append('dtoStudent.dni', this.addStudent.get('dni')?.value);
      formData.append('dtoStudent.name', this.addStudent.get('name')?.value);
      formData.append('dtoStudent.lastName',
        this.addStudent.get('lastName')?.value
      );
      formData.append(
        'dtoStudent.school',
        this.addStudent.get('school')?.value
      );
      formData.append(
        'dtoStudent.faculty',
        this.addStudent.get('faculty')?.value
      );
      formData.append(
        'dtoStudent.address',
        this.addStudent.get('address')?.value
      );
      formData.append('dtoStudent.sex', this.addStudent.get('sex')?.value);
      formData.append('dtoStudent.code', this.addStudent.get('code')?.value);
      formData.append('dtoStudent.phone', this.addStudent.get('phone')?.value);
      console.log(formData);
      this._studentService.saveStudent(formData).subscribe(
        (data) => {
          this.toastr.success(
            'El estudiante fue registrado con exito',
            'Registro completo!'
          );
          this.router.navigate(['/getall']);
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
    } else {

      let formData = new FormData();
      formData.append('dtoStudent.idStudent', this.id);
      formData.append('dtoStudent.dni', this.addStudent.get('dni')?.value);
      formData.append('dtoStudent.name', this.addStudent.get('name')?.value);
      formData.append(
        'dtoStudent.lastName',
        this.addStudent.get('lastName')?.value
      );
      formData.append(
        'dtoStudent.school',
        this.addStudent.get('school')?.value
      );
      formData.append(
        'dtoStudent.faculty',
        this.addStudent.get('faculty')?.value
      );
      formData.append(
        'dtoStudent.address',
        this.addStudent.get('address')?.value
      );
      formData.append('dtoStudent.sex', this.addStudent.get('sex')?.value);
      formData.append('dtoStudent.code', this.addStudent.get('code')?.value);
      formData.append('dtoStudent.phone', this.addStudent.get('phone')?.value);
      console.log(formData);
      this._studentService.updateStudent(formData).subscribe(
        (data) => {
          this.toastr.info(
            'El estudiante fue actualizado con exito',
            'Estudiante actualizado!'
          );
          this.router.navigate(['/getall']);
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
    }
  }
}
