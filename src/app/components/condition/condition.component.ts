import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dtoOpening } from 'src/app/interfaces/opening';
import { dtoStudent } from 'src/app/interfaces/student';
import { AdministratorService } from 'src/app/services/administrator.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { dtoPeriod } from 'src/app/interfaces/period';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css'],
})
export class ConditionComponent implements OnInit {
  selectedFile: File;

  id: string;

  student: dtoStudent[] | undefined;
  opening: dtoOpening[] | undefined;
  period: dtoPeriod[] | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _studentService: StudentService,
    private _administratorService: AdministratorService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.aRoute.snapshot.paramMap.get('id');
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getStudentCondition();
    this.getOpening();
    this.getPeriod();
  }
  // ---------------------------------------------------- STUDENT - OPENNIG - PERIOD
  getStudentCondition() {
    this._studentService.getStudent(this.id).subscribe((data) => {
      this.student = data;
    });
  }
  getOpening() {
    this._administratorService
      .getOpening('b454687f-048d-4c02-8255-885b52c33633')
      .subscribe((data) => {
        this.opening = data;
      });
  }
  getPeriod() {
    this._administratorService
      .getPeriod('101b3361-0aac-410b-9bf4-f9cd00a95f23')
      .subscribe((data) => {
        this.period = data;
      });
  }
  onButtonClick() {
    this.toastr.success('Bienvenido!', 'Acceso!');
    this.router.navigate(['/payment', this.id]);
  }
  
  // ---------------------------------------------------- UPLOAD IMAGE
  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
    this.uploadFile();
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);

      const url = `https://localhost:7282/student/SubirImagen?id=${this.id}`;
      this.http.post(url, formData).subscribe(
        (response) => {
          location.reload();
          console.log('Archivo enviado exitosamente al backend', response);
        },
        (error) => {
          console.error('Error al enviar el archivo al backend', error);
        }
      );
    }
  }
}
