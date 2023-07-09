import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AddEditStudentComponent } from './components/add-edit-student/add-edit-student.component';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { SeeStudentComponent } from './components/see-student/see-student.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConditionComponent } from './components/condition/condition.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { ApprovedStudentsComponent } from './components/approved-students/approved-students.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddEditStudentComponent,
    ListStudentComponent,
    SeeStudentComponent,
    FooterComponent,
    LoginComponent,
    ChangePasswordComponent,
    ConditionComponent,
    AdministratorComponent,
    PaymentComponent,
    ListProductComponent,
    TicketComponent,
    ImageDialogComponent,
    ApprovedStudentsComponent
  ],
  imports: [
    MatIconModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
