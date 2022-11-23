import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminCustomerComponent } from './admin-customer/admin-customer.component';
import{NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../../../pipes/filter.pipe'



@NgModule({
  declarations: [
    CreateCustomerComponent,
    AdminCustomerComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class CustomerModule { }
