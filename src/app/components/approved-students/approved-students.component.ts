import { Component } from '@angular/core';
import { dtoSaleDetail } from 'src/app/interfaces/saleDetail';
import { AdministratorService } from 'src/app/services/administrator.service';
import { ToastrService } from 'ngx-toastr';
import { SaleService } from 'src/app/services/sale.service';
import { dtoSale } from 'src/app/interfaces/sale';
import { dtoStudent } from 'src/app/interfaces/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-approved-students',
  templateUrl: './approved-students.component.html',
  styleUrls: ['./approved-students.component.css']
})
export class ApprovedStudentsComponent {
  listSaleDetail: dtoSaleDetail[] = [];
  listStudent: dtoStudent[] = [];
  student: dtoStudent[] | undefined;
  idPasar: any;
  idStudent: any;
  pru:any;

  constructor(
    private _administratorService: AdministratorService,
    private _saleService: SaleService,
    private toastr: ToastrService,
    private _studentService: StudentService
  ){

  }
  ngOnInit(): void {
    this.getSale();
  }
  getSale() {
    this._administratorService.getSaleDetail().subscribe(
      (data) => {
        this.listSaleDetail = data;
        this.idPasar = this.listSaleDetail[0].idSale;
        this.getListSale(this.idPasar);
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  getListSale(id:any) {
    this._saleService.getSaleId(id).subscribe(
      (data) => {
        this.listStudent = data;
        this.idStudent = this.listStudent[0].idStudent;
        this.getStudent(this.idStudent);
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  getStudent(id:any){
    this._studentService.getStudent(id).subscribe(data =>{
      this.student = data;
      this.pru = this.student![0].idStudent;
    })
  }
}
