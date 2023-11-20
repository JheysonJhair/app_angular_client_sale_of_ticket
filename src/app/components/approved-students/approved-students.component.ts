import { Component } from '@angular/core';
import { dtoSaleDetail } from 'src/app/interfaces/saleDetail';
import { AdministratorService } from 'src/app/services/administrator.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SaleService } from 'src/app/services/sale.service';
import { dtoAdministrator } from 'src/app/interfaces/administrator';
import { dtoStudent } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-approved-students',
  templateUrl: './approved-students.component.html',
  styleUrls: ['./approved-students.component.css'],
})
export class ApprovedStudentsComponent {
  listSaleDetail: dtoSaleDetail[] = [];
  listStudent: dtoStudent[] = [];
  admin: dtoAdministrator[] | undefined;
  id: string;
  student: dtoStudent[] | undefined;
  idPasar: any;
  idStudent: any;
  pru: any;

  constructor(
    private _administratorService: AdministratorService,
    private _saleService: SaleService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private _studentService: StudentService
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.getSale();
    this.getAdmin();
  }

  //------------------------------------------------------GET -ADMIN - SALE- LISTSALE - STUDENT
  getAdmin() {
    this._administratorService.getAdmin(this.id).subscribe((data) => {
      this.admin = data;
      console.log(data);
    });
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
  getListSale(id: any) {
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
  getStudent(id: any) {
    this._studentService.getStudent(id).subscribe((data) => {
      this.student = data;
      this.pru = this.student![0].idStudent;
    });
  }
}
