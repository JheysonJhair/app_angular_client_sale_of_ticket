import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { dtoOpening } from 'src/app/interfaces/opening';
import { AdministratorService } from 'src/app/services/administrator.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { dtoAdministrator } from 'src/app/interfaces/administrator';
import { dtoSaleDetail } from 'src/app/interfaces/saleDetail';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
})
export class AdministratorComponent {
  id: string;

  admin: dtoAdministrator[] | undefined;
  inputValue: number = 90;
  opening: dtoOpening[] | undefined;

  listSaleDetail: dtoSaleDetail[] = [];

  constructor(
    public dialog: MatDialog,
    private _administratorService: AdministratorService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.getOpening();
    this.getAdmin();
    this.getSale();

  }
  //------------------------------------------------------GET -ADMIN - OPENING- VOUCHERS
  getAdmin() {
    this._administratorService.getAdmin(this.id).subscribe((data) => {
      this.admin = data;
    });
  }

  getOpening() {
    this._administratorService
      .getOpening('3fb8ce38-50b9-4ca8-873e-bbb0c5f4d196')
      .subscribe((data) => {
        this.opening = data;
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

  //------------------------------------------------------DELETE VOUCHER
  deleteSale(id: any) {
    this._administratorService.deleteSaleDetail(id).subscribe(
      (data) => {
        this.getSale();
        this.toastr.error(
          'Estudiante no admitido',
          'Eliminado!'
        );
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }

  //------------------------------------------------------ SEE VOUCHER
  openImageDialog(event: Event, imagen: any) {
    event.preventDefault();
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl: imagen},
      panelClass: 'image-dialog-container',
    });
  }

  //------------------------------------------------------ ADMITIR VOUCHER
  admitirSale(id: any) {
    this.inputValue -= 1;
    let formData = new FormData();
    formData.append('id', id);
    this._administratorService
    .stateChange(formData)
    .subscribe((data) => {
      location.reload();
    });
  }

  //------------------------------------------------------ CHANGE OPNNING
  updateStateApertura() {

    let formData = new FormData();
    formData.append('dtoOpening.idOpening', '' + this.opening![0].idOpening);
    formData.append(
      'dtoOpening.priorityQuantity',
      '' + this.opening![0].priorityQuantity
    );
    formData.append('dtoOpening.quantity', '' + this.opening![0].quantity);
    formData.append('dtoOpening.openState', '' +true);
    formData.append('dtoOpening.idPeriod',''+ this.opening![0].idPeriod);
    this._administratorService.updateOpening(formData).subscribe(
      (data) => {
        this.toastr.info('Mensaje', 'Apertura!');
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
    setTimeout(function() {
      location.reload();
    }, 2000);
  }
  updateStateCierre() {

    let formData = new FormData();
    formData.append('dtoOpening.idOpening', '' + this.opening![0].idOpening);
    formData.append(
      'dtoOpening.priorityQuantity',
      '' + this.opening![0].priorityQuantity
    );
    formData.append('dtoOpening.quantity', '' + this.opening![0].quantity);
    formData.append('dtoOpening.openState', '' + false);
    formData.append('dtoOpening.idPeriod',''+ this.opening![0].idPeriod);
    this._administratorService.updateOpening(formData).subscribe(
      (data) => {
        this.toastr.info('Mensaje', 'Cierre!');
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
    setTimeout(function() {
      location.reload();
    }, 2000);
  }
}
