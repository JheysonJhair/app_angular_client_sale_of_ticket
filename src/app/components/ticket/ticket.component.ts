import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dtoStudent } from 'src/app/interfaces/Student';
import { StudentService } from 'src/app/services/student.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  idPasar: string;
  listStudent: dtoStudent[] = []

  constructor(private _studentService: StudentService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private aRoute:ActivatedRoute){

      this.aRoute.snapshot.paramMap.get('id');
      this.idPasar = this.aRoute.snapshot.paramMap.get('id')!;
  }
  ngOnInit(){
    this.getStudent(this.idPasar);
  }
  getStudent(id: any){
      this._studentService.getStudent(id).subscribe(data =>{
        this.listStudent = data;
      },error =>{
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      })

  }
  aler() {
    window.print();
  }

}

