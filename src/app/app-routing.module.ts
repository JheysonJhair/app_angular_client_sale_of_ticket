import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditStudentComponent } from './components/add-edit-student/add-edit-student.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { LoginComponent } from './components/login/login.component';
import { SeeStudentComponent } from './components/see-student/see-student.component';
import { ConditionComponent } from './components/condition/condition.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { ApprovedStudentsComponent } from './components/approved-students/approved-students.component';

const routes: Routes =[
  { path: '' , component: LoginComponent},
  { path: 'pass' , component: ChangePasswordComponent},
  { path: 'administrator/:id_a/getall', component: ListStudentComponent },
  { path: 'administrator/:id_a/insert', component: AddEditStudentComponent},
  { path: 'administrator/:id_a/update/:id', component: AddEditStudentComponent},
  { path: 'see/:id', component: SeeStudentComponent},
  { path: 'condition/:id', component: ConditionComponent},
  { path: 'payment/:id', component: PaymentComponent},
  { path: 'ticket/:id/:total', component: TicketComponent},
  { path: 'administrator/:id_a', component: AdministratorComponent},
  { path: 'administrator/:id_a/listComedor', component: ApprovedStudentsComponent },
  { path: '**', redirectTo: '/', pathMatch:'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
