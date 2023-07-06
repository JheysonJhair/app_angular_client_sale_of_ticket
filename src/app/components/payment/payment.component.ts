import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { dtoPeriod } from 'src/app/interfaces/period';
import { dtoProduct } from 'src/app/interfaces/product';
import { dtoStudent } from 'src/app/interfaces/Student';
import { ProductService } from 'src/app/services/product.service';
import { StudentService } from 'src/app/services/student.service';

import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DatePipe],
})
export class PaymentComponent implements OnInit {
  idPasar: string;
  codeAdmi: string = ' ';
  public static idS: string;

  total: number = 0;
  student: dtoStudent[] | undefined;
  periodo: dtoPeriod[] | undefined;
  //listProduct: dtoProduct[] = []
  listProduct = [
    { name: 'Desayuno', price: 10, selected: false },
    { name: 'Almuerzo', price: 15, selected: false },
  ];

  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _studentService: StudentService,
    private _saleService: SaleService,
    private _productService: ProductService,
    private toastr: ToastrService
  ) {
    this.aRoute.snapshot.paramMap.get('id');
    this.idPasar = this.aRoute.snapshot.paramMap.get('id')!;
    console.log(this.idPasar);
  }

  ngOnInit(): void {
    this.getStudentCondition();
    this.getAlmuerzoDesayuno();
    this.getFecha();
  }

  getAlmuerzoDesayuno() {
    this._productService.getListProduct().subscribe(
      (data) => {
        this.listProduct = data.listDtoProduct;
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  getStudentCondition() {
    this._studentService.getStudent(this.idPasar).subscribe((data) => {
      this.student = data;
    });
  }
  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.total += parseFloat(event.target.value);
    } else {
      this.total -= parseFloat(event.target.value);
    }
    console.log('TOTAL' + this.total);
  }
  getFecha() {
    this._productService
      .getFecha('6f9844b4-d54e-4771-b492-b61a61993ba1')
      .subscribe((data) => {
        this.periodo = data;
        console.log('PERIODO: ' + '6f9844b4-d54e-4771-b492-b61a61993ba1');
        this.periodo!.forEach((element) => {});
      });
  }
  enviarTicket() {
    this.toastr.success('Ultimo Paso!', 'Preparando Ticket!');
    this.router.navigate(['/ticket', this.idPasar]);
  }
  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  Cargar(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('dtoSale.idStudent', this.idPasar);
      formData.append(
        'dtoSale.idPeriod',
        '6f9844b4-d54e-4771-b492-b61a61993ba1'
      );
      formData.append('dtoSale.couponImg', this.selectedFile);
      formData.append('dtoSale.total', '' + this.total);

      this._saleService.saveSale(formData).subscribe(
        (data) => {
          this.toastr.success(
            'Pago realizado  con exito',
            'Registro completo!'
          );
          this.router.navigate(['/getall']);
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
    }
  }

  hasSelectedProduct(): boolean {
    return this.listProduct.some((product) => product.selected);
  }
}
