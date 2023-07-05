import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dtoOpening } from 'src/app/interfaces/opening';
import { dtoStudent } from 'src/app/interfaces/Student';
import { AdministratorService } from 'src/app/services/administrator.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';


@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent {
  isDisabled: boolean = false;
  inputValue: number = 90;
  opening: dtoOpening[] | undefined;


  dtoStudent: dtoStudent | undefined;
  listStudentAdmin: dtoStudent[] = [
    {dni:'7777777',code:'201054',name:'Jhaircito',lastName:'Arone Angeles',school:'Ingenieria sistemas',faculty:'ing',phone:'999999999',address:'Av apurimac',sex:'',profileImg:'../../../assets/img/yape.jpeg'},
    {dni:'7777777',code:'201054',name:'Jhaircito',lastName:'Arone Angeles',school:'Ingenieria sistemas',faculty:'ing',phone:'999999999',address:'Av apurimac',sex:'',profileImg:'../../../assets/img/yape.jpeg'},
    {dni:'7777777',code:'201054',name:'Jhaircito',lastName:'Arone Angeles',school:'Ingenieria sistemas',faculty:'ing',phone:'999999999',address:'Av apurimac',sex:'',profileImg:'../../../assets/img/yape.jpeg'},
    {dni:'7777777',code:'201054',name:'Jhaircito',lastName:'Arone Angeles',school:'Ingenieria sistemas',faculty:'ing',phone:'999999999',address:'Av apurimac',sex:'',profileImg:'../../../assets/img/IconSalir.png'}
  ]
  constructor(public dialog: MatDialog, private _administratorService: AdministratorService,
    private toastr: ToastrService){

  }
  ngOnInit(): void{
    this.acceptStudent();
    this.getOpening();
  }
  openImageDialog(event: Event,studentAdmin: any) {
    event.preventDefault();
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl: studentAdmin.imagenUrl },
      panelClass: 'image-dialog-container'
    });
  }

  acceptStudent(){
    /*let formData = new FormData();
    formData.append("dtoStudent.dni","");
    console.log(formData);
    this._administratorService.acceptStudent(formData).subscribe(data =>{
      this.toastr.error('El estudiante fue eliminado con exito', 'Registro eliminado!');
    },error =>{
      this.toastr.error('Opss ocurrio un error', 'Error');
      console.log(error);
    })*/
  }
  discardStudent(id: any){
    this._administratorService.discardStudent(id).subscribe(data =>{
      this.toastr.error('El estudiante fue eliminado con exito', 'Registro eliminado!');
    },error =>{
      this.toastr.error('Opss ocurrio un error', 'Error');
      console.log(error);
    })
  }

  changeValue() {
    this.inputValue -= 1;
  }

  getOpening(){
    this._administratorService.getOpening("b454687f-048d-4c02-8255-885b52c33633").subscribe(data =>{
      this.opening = data;
      console.log(data);

    })
  }
  disableButton() {
    this.isDisabled = true;
  }
}
