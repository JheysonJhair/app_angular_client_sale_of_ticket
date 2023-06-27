import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dtoProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  listProduct: dtoProduct[] = [];
  constructor(private _productService: ProductService,
    private toastr: ToastrService){
  }
}

