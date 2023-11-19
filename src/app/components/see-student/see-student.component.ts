import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dtoStudent } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-see-student',
  templateUrl: './see-student.component.html',
  styleUrls: ['./see-student.component.css']
})
export class SeeStudentComponent implements OnInit {

  id: string;

  student: dtoStudent[] | undefined;

  constructor(private aRoute: ActivatedRoute, private _studentService: StudentService){

    this.aRoute.snapshot.paramMap.get('id');
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.getStudent();
  }
  getStudent(){
    console.log(this.id);
    this._studentService.getStudent(this.id).subscribe(data =>{
      this.student = data;
      console.log(data);
    })
  }
}
