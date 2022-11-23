import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleValidateGuard } from 'src/app/guards/role-validate.guard';
import { AdminCustomerComponent } from './admin-customer/admin-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: 'create', component: CreateCustomerComponent },
  {
    path: 'admin', data: {role : [1]}, canActivate: [RoleValidateGuard],
    component: AdminCustomerComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
