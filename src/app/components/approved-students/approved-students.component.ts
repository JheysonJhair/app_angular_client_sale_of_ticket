import { Component } from '@angular/core';
import { dtoSaleDetail } from 'src/app/interfaces/saleDetail';
import { AdministratorService } from 'src/app/services/administrator.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SaleService } from 'src/app/services/sale.service';
import { dtoAdministrator } from 'src/app/interfaces/administrator';
import { dtoStudent } from 'src/app/interfaces/student';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-approved-students',
  templateUrl: './approved-students.component.html',
  styleUrls: ['./approved-students.component.css'],
})
export class ApprovedStudentsComponent {
  id: string;

  listSaleDetail: dtoSaleDetail[] = [];
  admin: dtoAdministrator[] | undefined;

  pdfUrl = '../../../assets/pdf/DENEGADOS.pdf';
  @ViewChild('denegadosButton') denegadosButton: ElementRef;
  constructor(
    private _administratorService: AdministratorService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,

  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id_a')!;
  }
  ngOnInit(): void {
    this.getSale();
    this.getAdmin();
  }

  //------------------------------------------------------GET -ADMIN - SALE- LISTSALE
  getAdmin() {
    this._administratorService.getAdmin(this.id).subscribe((data) => {
      this.admin = data;
    });
  }

  getSale() {
    this._administratorService.getSaleDetail().subscribe(
      (data) => {
        this.listSaleDetail = data;
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }


  //------------------------------------------------------DONWLOAD PDF
  descargarPDF() {
    this.denegadosButton.nativeElement.click();
  }
}
