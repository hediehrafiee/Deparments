import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {DpDatePickerModule} from 'ng2-date-picker';

const routes: Routes = [
  {path: '', component: DepartmentComponent}
];

@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    SweetAlert2Module.forRoot(),
    DpDatePickerModule
  ]
})
export class DepartmentModule { }
