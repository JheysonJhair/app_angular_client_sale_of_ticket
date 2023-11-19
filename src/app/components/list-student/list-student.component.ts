import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dtoStudent } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
})
export class ListStudentComponent {
  listStudent: dtoStudent[] = [];
  constructor(
    private _studentService: StudentService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getStudent();
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
