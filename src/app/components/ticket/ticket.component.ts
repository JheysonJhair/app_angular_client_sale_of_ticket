import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dtoStudent } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  fechaActual: string;
  idPasar: string;
  totalPasar: string;
  listStudent: dtoStudent[] = [];

  constructor(
    private _studentService: StudentService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    const fecha = new Date();
    this.fechaActual = fecha.toLocaleDateString();
    this.aRoute.snapshot.paramMap.get('id');
    this.idPasar = this.aRoute.snapshot.paramMap.get('id')!;
    this.totalPasar = this.aRoute.snapshot.paramMap.get('total')!;
  }
  ngOnInit() {
    this.getStudent(this.idPasar);
  }
  getStudent(id: any) {
    this._studentService.getStudent(id).subscribe(
      (data) => {
        this.listStudent = data;
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  printDiv() {
    let voucher = document.getElementById('voucher');
    if (voucher) {
      let printContents = voucher.outerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    } else {
      console.log('El objeto con el ID "voucher" no existe.');
    }
  }


}
