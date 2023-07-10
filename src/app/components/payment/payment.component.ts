import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { dtoPeriod } from 'src/app/interfaces/period';
import { dtoStudent } from 'src/app/interfaces/Student';
import { ProductService } from 'src/app/services/product.service';
import { StudentService } from 'src/app/services/student.service';

import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SaleService } from 'src/app/services/sale.service';
import { dtoSale } from 'src/app/interfaces/sale';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DatePipe],
})
export class PaymentComponent implements OnInit {
  idPasar: string;
  codeAdmi: string;
  public static idS: string;

  total: number = 0;
  student: dtoStudent[] | undefined;
  periodo: dtoPeriod[] | undefined;
  saleSateHelp:boolean = true;
  //listProduct: dtoProduct[] = []
  listProduct = [
    { name: 'Desayuno', price: 10, selected: false },
    { name: 'Almuerzo', price: 15, selected: false },
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
    this.idPasar = this.aRoute.snapshot.paramMap.get('id')!;

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
  getSaleAll(){

  }
  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.total += parseFloat(event.target.value);
    } else {
      this.total -= parseFloat(event.target.value);
    }
  }
  getFecha() {
    this._productService
      .getFecha('101b3361-0aac-410b-9bf4-f9cd00a95f23')
      .subscribe((data) => {
        this.periodo = data;
        this.periodo!.forEach((element) => {});
      });
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
        '101b3361-0aac-410b-9bf4-f9cd00a95f23'
      );
      formData.append('dtoSale.total', ''+this.total);
      formData.append('file', this.selectedFile);
      this._saleService.saveSale(formData).subscribe(
        (data) => {

          this.toastr.success(
            'Pago realizado  con exito',
            'Completado!'
          );
          this.router.navigate(['/ticket', this.idPasar, this.total]);
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
    }
  }
}
