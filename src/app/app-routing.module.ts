import { AppComponent } from './app.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTESLANDSCAPES } from './utilities/landscape';
import { AuthRoutingModule } from './modules/public/auth/auth-routing.module';
import { DashboardAdminComponent } from './modules/container/dashboard-admin/dashboard-admin.component';
import { ROUTESDASHBOARD } from './utilities/dashboard';
import { UnauthorizedComponent } from './modules/shared/unauthorized/unauthorized.component';
import { DashboardCustomerComponent } from './modules/container/dashboard-customer/dashboard-customer.component';
import { ROUTESDASHBOARDCUSTOMER } from './utilities/dashboard-customer';
import { RoleValidateGuard } from './guards/role-validate.guard';

const routes: Routes = [
  { path: '', children: ROUTESLANDSCAPES },
  {
    path: 'private',
    component: DashboardAdminComponent,
    data: { role: [1] },
    canActivate: [RoleValidateGuard],
    children: ROUTESDASHBOARD,
  },
  {
    path: 'private-customer',
    component: DashboardCustomerComponent,
    data: { role: [2] },
    canActivate: [RoleValidateGuard],
    children: ROUTESDASHBOARDCUSTOMER,
  },
  { path: 'error/unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
