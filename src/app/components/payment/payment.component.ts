import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { dtoPeriod } from 'src/app/interfaces/period';
import { dtoStudent } from 'src/app/interfaces/student';
import { ProductService } from 'src/app/services/product.service';
import { StudentService } from 'src/app/services/student.service';

import { DatePipe } from '@angular/common';
import { SaleService } from 'src/app/services/sale.service';
import { dtoSaleDetail } from 'src/app/interfaces/saleDetail';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DatePipe],
})
export class PaymentComponent implements OnInit {
  id: string;
  total: number = 0;
  saleStateHelp: number;

  message: string;

  student: dtoStudent[] | undefined;
  periodo: dtoPeriod[] | undefined;
  listSaleDetail: dtoSaleDetail[] = [];

  listProduct = [
    { name: 'Desayuno', price: 2, selected: false },
    { name: 'Almuerzo', price: 10, selected: false },
  ];

  selectedFile: any;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private _studentService: StudentService,
    private _saleService: SaleService,
    private _productService: ProductService,
    private toastr: ToastrService
  ) {
    this.aRoute.snapshot.paramMap.get('id');
    this.id = this.aRoute.snapshot.paramMap.get('id')!;

  }

  ngOnInit(): void {
    this.getStudent();
    this.getAlmuerzoDesayuno();
    this.getFecha();
    this.getStateStudent();
  }
  // ---------------------------------------------------- GET PRODUCTO - STUDENT -FECHA
  getAlmuerzoDesayuno() {
    this._productService.getListProduct().subscribe(
      (data) => {
        this.listProduct = data.listDtoProduct;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getStudent() {
    this._studentService.getStudent(this.id).subscribe((data) => {
      this.student = data;
    });
  }

  getFecha() {
    this._productService
      .getFecha('c4dcbaf6-63b9-4d95-bc33-9d428e0a5113')
      .subscribe((data) => {
        this.periodo = data;
        this.periodo!.forEach((element) => {});
      });
  }
  getStateStudent(){
    this._saleService.getSaleGeyByIdStudent(this.id).subscribe((data) => {
      this.listSaleDetail = data;
      this.saleStateHelp = (this.listSaleDetail[0].saleState)
      if(this.saleStateHelp == 2){
        this.message = "Compra realizada";
      }else if(this.saleStateHelp == 1){
        this.message = "Compra en proceso";
      }else if(this.saleStateHelp == 0){
        this.message = "";
      }else{
        this.message = "Compra rechzada";
      }
    });
  }
  // ---------------------------------------------------- CHECKBOX
  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.total += parseFloat(event.target.value);
    } else {
      this.total -= parseFloat(event.target.value);
    }
  }

  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  // ---------------------------------------------------- TRAER TICKET
  ticket(){
    this.router.navigate(['/ticket', this.id]);
  }

  // ---------------------------------------------------- DATOS BACK
  buy(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('dtoSale.idStudent', this.id);
      formData.append(
        'dtoSale.idPeriod',
        'c4dcbaf6-63b9-4d95-bc33-9d428e0a5113'
      );
      formData.append('dtoSale.total', ''+this.total);
      formData.append('file', this.selectedFile);
      this._saleService.saveSale(formData).subscribe(
        (data) => {
          this.toastr.success(
            'Pago realizado  con exito',
            'Completado!'
          );
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
    }
  }
}
