import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dtoOpening } from 'src/app/interfaces/opening';
import { dtoStudent } from 'src/app/interfaces/Student';
import { AdministratorService } from 'src/app/services/administrator.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {
  idPasar: string;
  codeAdmi:string = " ";
  public static idS:string;

  student: dtoStudent[] | undefined;
  opening: dtoOpening[] | undefined;


  constructor(private router: Router,private _studentService: StudentService,private _administratorService: AdministratorService,private aRoute:ActivatedRoute,
    private toastr: ToastrService,){

      this.aRoute.snapshot.paramMap.get('id');
      this.idPasar = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getStudentCondition();
    this.getOpening();

  }
  getStudentCondition(){
    this._studentService.getStudent(this.idPasar).subscribe(data =>{
      this.student = data;
      console.log(this.idPasar);
    })
  }
  getOpening(){
    this._administratorService.getOpening("b454687f-048d-4c02-8255-885b52c33633").subscribe(data =>{
      this.opening = data;

    })

  }
  onButtonClick(){
    this.toastr.success('Bienvenido!', 'Acceso!');
    this.router.navigate(['/payment',this.idPasar]);
  }
}
