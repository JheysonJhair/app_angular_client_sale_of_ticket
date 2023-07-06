import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dtoOpening } from 'src/app/interfaces/opening';
import { dtoStudent } from 'src/app/interfaces/Student';
import { AdministratorService } from 'src/app/services/administrator.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {
  selectedFile: File;
  idPasar: string;
  codeAdmi:string = " ";
  public static idS:string;

  student: dtoStudent[] | undefined;
  opening: dtoOpening[] | undefined;

  constructor(private http: HttpClient,private router: Router,private _studentService: StudentService,private _administratorService: AdministratorService,private aRoute:ActivatedRoute,
    private toastr: ToastrService,){

      this.aRoute.snapshot.paramMap.get('id');
      this.idPasar = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getStudentCondition();
    this.getOpening();

  }

  getStudentCondition(){
    this._studentService.getStudent(this.idPasar).subscribe(data =>{
      this.student = data;
    })
  }
  getOpening(){
    this._administratorService.getOpening("b454687f-048d-4c02-8255-885b52c33633").subscribe(data =>{
      this.opening = data;

    })

  }
  onButtonClick(){
    this.toastr.success('Bienvenido!', 'Acceso!');
    this.router.navigate(['/payment',this.idPasar]);
  }

  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
    this.uploadFile();
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);
      console.log("algo"+formData);
      this.http.post('https://localhost:7282/Student/SubirImagen', formData).subscribe(
        (response) => {
          console.log('Archivo enviado exitosamente al backend', response);
        },
        (error) => {
          console.error('Error al enviar el archivo al backend', error);
        }
      );
    }
  }
}
