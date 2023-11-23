import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dtoStudent } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';
import { dtoTicket } from 'src/app/interfaces/ticket';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  id: string;
  totalPasar: string;
  ticket: dtoTicket;

  constructor(
    private _saleService: SaleService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    const fecha = new Date();
    this.aRoute.snapshot.paramMap.get('id');
    this.id = this.aRoute.snapshot.paramMap.get('id')!;

  }
  ngOnInit() {
    this.getTicket(this.id);
  }
  // ---------------------------------------------------- TRAER TICKET
  getTicket(id: any) {
    this._saleService.getTicket(id).subscribe(
      (data) => {
        this.ticket = data;
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  // ---------------------------------------------------- IMPRIMIR
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
