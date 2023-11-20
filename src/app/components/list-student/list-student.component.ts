import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dtoStudent } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';
import { dtoAdministrator } from 'src/app/interfaces/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
})
export class ListStudentComponent {
  listStudent: dtoStudent[] = [];
  admin: dtoAdministrator[] | undefined;
  id: string;
  id2: string;
  constructor(
    private _studentService: StudentService,
    private _administratorService: AdministratorService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
    this.id = this.aRoute.snapshot.paramMap.get('id2')!;
  }
  ngOnInit(): void {
    this.getStudent();
    this.getAdmin();
  }

  //------------------------------------------------------GET -ADMIN - SALE- LISTSALE - STUDENT
  getAdmin() {
    this._administratorService.getAdmin(this.id).subscribe((data) => {
      this.admin = data;
      console.log(data);
    });
  }
  getStudent() {
    this._studentService.getListStudent().subscribe(
      (data) => {
        this.listStudent = data.listDtoStudent;
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  deleteStudent(id: any) {
    this._studentService.deleteStudent(id).subscribe(
      (data) => {
        this.getStudent();
        this.toastr.error(
          'El estudiante fue eliminado con exito',
          'Registro eliminado!'
        );
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
}
