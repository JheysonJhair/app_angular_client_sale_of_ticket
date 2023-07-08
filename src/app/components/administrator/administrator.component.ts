import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { dtoOpening } from 'src/app/interfaces/opening';
import { dtoStudent } from 'src/app/interfaces/Student';
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
  idPasar: string;
  stateFinal: boolean;

  admin: dtoAdministrator[] | undefined;
  inputValue: number = 90;
  opening: dtoOpening[] | undefined;

  dtoStudent: dtoStudent | undefined;
  listSaleDetail: dtoSaleDetail[] = [];

  constructor(
    public dialog: MatDialog,
    private _administratorService: AdministratorService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.idPasar = this.aRoute.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.getOpening();
    this.getAdmin();
    this.getSale();
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
  getAdmin() {
    this._administratorService.getAdmin(this.idPasar).subscribe((data) => {
      this.admin = data;
    });
  }
  openImageDialog(event: Event, studentAdmin: any) {
    event.preventDefault();
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl: studentAdmin.imagenUrl },
      panelClass: 'image-dialog-container',
    });
  }

  changeValue() {
    this.inputValue -= 1;
  }

  getOpening() {
    this._administratorService
      .getOpening('b454687f-048d-4c02-8255-885b52c33633')
      .subscribe((data) => {
        this.opening = data;
        console.log(this.opening![0].openState);
      });
  }
  updateState() {
    this.stateFinal = true;

    let formData = new FormData();
    formData.append('dtoOpening.idOpening', '' + this.opening![0].idOpening);
    formData.append(
      'dtoOpening.priorityQuantity',
      '' + this.opening![0].priorityQuantity
    );
    formData.append('dtoOpening.quantity', '' + this.opening![0].quantity);
    formData.append('dtoOpening.openState', '' + this.stateFinal);
    formData.append(
      'dtoOpening.idPeriod',
      '101b3361-0aac-410b-9bf4-f9cd00a95f23'
    );
    location.reload();
    this._administratorService.updateOpening(formData).subscribe(
      (data) => {
        this.toastr.info('Mensaje', 'Apertura!');
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
  updateState2() {
    this.stateFinal = false;

    let formData = new FormData();
    formData.append('dtoOpening.idOpening', '' + this.opening![0].idOpening);
    formData.append(
      'dtoOpening.priorityQuantity',
      '' + this.opening![0].priorityQuantity
    );
    formData.append('dtoOpening.quantity', '' + this.opening![0].quantity);
    formData.append('dtoOpening.openState', '' + this.stateFinal);
    formData.append(
      'dtoOpening.idPeriod',
      '101b3361-0aac-410b-9bf4-f9cd00a95f23'
    );
    location.reload();
    this._administratorService.updateOpening(formData).subscribe(
      (data) => {
        this.toastr.info('Mensaje', 'Apertura!');
      },
      (error) => {
        this.toastr.error('Opss ocurrio un error', 'Error');
        console.log(error);
      }
    );
  }
}
