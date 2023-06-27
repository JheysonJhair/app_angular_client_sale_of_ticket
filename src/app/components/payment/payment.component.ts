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

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DatePipe]
})
export class PaymentComponent implements OnInit {
  idPasar: string;
  codeAdmi:string = " ";
  public static idS:string;


  total: number = 0;
  student: dtoStudent[] | undefined;
  periodo: dtoPeriod[] | undefined;
  //listProduct: dtoProduct[] = []
  listProduct = [
    { name: 'Desayuno', price: 10, selected: false },
    { name: 'Almuerzo', price: 15, selected: false }
  ];

  selectedFile: File | null = null;


  constructor(private http:HttpClient,private router: Router, private aRoute: ActivatedRoute,private _studentService: StudentService,private _productService: ProductService,
    private toastr: ToastrService){

      this.aRoute.snapshot.paramMap.get('id');
      this.idPasar = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void{
    this.getStudentCondition();
    this.getAlmuerzoDesayuno();
    this.getFecha();
  }

  getAlmuerzoDesayuno(){
    this._productService.getListProduct().subscribe(data =>{
      this.listProduct = data.listDtoProduct;
    },error =>{
      this.toastr.error('Opss ocurrio un error', 'Error');
      console.log(error);
    })
  }
  getStudentCondition(){
    this._studentService.getStudent(this.idPasar).subscribe(data =>{
      this.student = data;
    })
  }
  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.total += parseFloat(event.target.value);
    } else {
      this.total -= parseFloat(event.target.value);
    }
  }
  getFecha(){
    this._productService.getFecha("b454687f-048d-4c02-8255-885b52c33632").subscribe(data =>{
      this.periodo = data;
      console.log(this.periodo);
      this.periodo!.forEach(element => {
        console.log(element);
      });
    })
  }
  enviarTicket(){
    this.toastr.success('Ultimo Paso!', 'Preparando Ticket!');
    this.router.navigate(['/ticket',this.idPasar]);
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  hasSelectedProduct(): boolean {
    return this.listProduct.some(product => product.selected);
  }

  uploadImage(event: Event): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http.post('http://your-backend-api-url', formData)
        .subscribe(
          response => {
            // Manejar la respuesta del backend
          },
          error => {
            this.toastr.error('No se puedo cargar la imagen', 'Error');
            console.log(error);
          }
        );
    }
  }
}
