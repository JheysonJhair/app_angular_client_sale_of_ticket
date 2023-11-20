import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { dtoPeriod } from 'src/app/interfaces/period';
import { dtoStudent } from 'src/app/interfaces/student';
import { ProductService } from 'src/app/services/product.service';
import { StudentService } from 'src/app/services/student.service';

import { DatePipe } from '@angular/common';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DatePipe],
})
export class PaymentComponent implements OnInit {
  id: string;
  codeAdmi: string;

  total: number = 0;
  student: dtoStudent[] | undefined;
  periodo: dtoPeriod[] | undefined;
  saleStateHelp: boolean = false;

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
      .getFecha('101b3361-0aac-410b-9bf4-f9cd00a95f23')
      .subscribe((data) => {
        this.periodo = data;
        this.periodo!.forEach((element) => {});
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
    console.log("MI TICKET");
  }

  // ---------------------------------------------------- DATOS BACK
  buy(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('dtoSale.idStudent', this.id);
      formData.append(
        'dtoSale.idPeriod',
        '101b3361-0aac-410b-9bf4-f9cd00a95f23'
      );
      formData.append('dtoSale.total', ''+this.total);
      formData.append('file', this.selectedFile);
      this._saleService.saveSale(formData).subscribe(
        (data) => {
          console.log("VALIDAR MARCAR COMPRA");
          this.toastr.success(  
            'Pago realizado  con exito',
            'Completado!'
          );
          this.router.navigate(['/ticket', this.id, this.total]);
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
    }
  }
}
