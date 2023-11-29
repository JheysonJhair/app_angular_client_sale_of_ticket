import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { dtoOpening } from 'src/app/interfaces/opening';
import { AdministratorService } from 'src/app/services/administrator.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { dtoAdministrator } from 'src/app/interfaces/administrator';
import { dtoSaleDetail } from 'src/app/interfaces/saleDetail';
import { SaleService } from 'src/app/services/sale.service';
import { PeriodService } from 'src/app/services/period.service';
import { dtoPeriod } from 'src/app/interfaces/period';
import { OpeningService } from 'src/app/services/opening.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
})
export class AdministratorComponent {
  id: string;
  inputValue: number;

  addPeriod: FormGroup;
  addOpening: FormGroup;

  opening: dtoOpening[] | undefined;
  admin: dtoAdministrator[] | undefined;
  listSaleDetail: dtoSaleDetail[] = [];

  period: dtoPeriod[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _administratorService: AdministratorService,
    private _periodService: PeriodService,
    private _openingService: OpeningService,
    private _saleService: SaleService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addPeriod = this.fb.group({
      name: ['', Validators.required],
      startDate : ['', Validators.required],
      endDate : ['', Validators.required],
    });
    this.addOpening = this.fb.group({
      quantity : ['', Validators.required],
      priorityQuantity  : ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id_a')!;
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
      .getOpening('4p3rtur4-cf20-4937-bd3a-87d7408c4f3i')
      .subscribe((data) => {
        this.opening = data;
        this.inputValue = this.opening![0].quantity;
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
    this._saleService.getSaleModifyStateFail(id).subscribe(
      (data) => {},
      (error) => {
        console.log(error);
      }
    );
    this.toastr.error('Estudiante no admitido', 'Eliminado!');
    setTimeout(function () {
      location.reload();
    }, 1500);
  }

  //------------------------------------------------------ SEE VOUCHER
  openImageDialog(event: Event, imagen: any) {
    event.preventDefault();
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl: imagen },
      panelClass: 'image-dialog-container',
    });
  }

  //------------------------------------------------------ ADMITIR VOUCHER
  admitirSale(id: any) {
    let idSale = id;
    let idOpening = this.opening![0].idOpening;

    const data = {
      idOpening: idOpening,
      idSale: idSale,
    };

    this._saleService.decreaseQuantity(data).subscribe(
      (response) => {
        this.toastr.info('Mensaje', 'Estudiante con comedor!');
      },
      (error) => {
        this.toastr.info('Mensaje', 'Estudiante con comedor!');
      }
    );
    setTimeout(function () {
      location.reload();
    }, 1500);
  }

  //------------------------------------------------------ CHANGE OPENING
  updateStateApertura() {
    let formData = new FormData();
    formData.append('dtoOpening.idOpening', '' + this.opening![0].idOpening);
    formData.append(
      'dtoOpening.priorityQuantity',
      '' + this.opening![0].priorityQuantity
    );
    formData.append('dtoOpening.quantity', '' + this.opening![0].quantity);
    formData.append('dtoOpening.openState', '' + true);
    formData.append('dtoOpening.idPeriod', '' + this.opening![0].idPeriod);
    this._administratorService.updateOpening(formData).subscribe(
      (data) => {
        this.toastr.info('Mensaje', 'Apertura!');
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
    setTimeout(function () {
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
    formData.append('dtoOpening.idPeriod', '' + this.opening![0].idPeriod);
    this._administratorService.updateOpening(formData).subscribe(
      (data) => {
        this.toastr.info('Mensaje', 'Cierre!');
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
    setTimeout(function () {
      location.reload();
    }, 2000);
  }
    //------------------------------------------------------ POST PERIOD - POST OPENING
    getPeriodo() {
      this._periodService.getAllPeriod().subscribe((data) => {
        this.period = data;
      });
    }
    postPeriodo() {
      let formData = new FormData();
      formData.append('dtoPeriod.startDate ', this.addPeriod.get('startDate')?.value);
      formData.append('dtoPeriod.endDate ', this.addPeriod.get('endDate')?.value);
      formData.append('dtoPeriod.name ',this.addPeriod.get('name ')?.value);

      this._periodService.insertPeriod(formData).subscribe(
        (data) => {
          this.toastr.info(
            'Periodo registrado',
            'Guardado!'
          );
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
      //setTimeout(function () {
      //  location.reload();
      //}, 1500);
    }
    postOpening() {
      let formData = new FormData();
      formData.append('dtoOpening.priorityQuantity  ', this.addOpening.get('priorityQuantity ')?.value);
      formData.append('dtoOpening.quantity  ', this.addOpening.get('quantity ')?.value);
      formData.append('dtoOpening.openState   ', "1");
      formData.append('dtoOpening.idPeriod    ', "1");

      this._openingService.insertOpening(formData).subscribe(
        (data) => {
          this.toastr.info(
            'Apertura registrada registrado',
            'Guardado!'
          );
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
      //setTimeout(function () {
      //  location.reload();
      //}, 1500);
    }
}

