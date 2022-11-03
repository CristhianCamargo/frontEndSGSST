import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardCustomerComponent } from './dashboard-customer/dashboard-customer.component';


@NgModule({
  declarations: [
    DashboardAdminComponent,
    DashboardCustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    DashboardAdminComponent,
    DashboardCustomerComponent
  ]
})
export class ContainerModule { }
