import { AppComponent } from './app.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTESLANDSCAPES } from './utilities/landscape';
import { AuthRoutingModule } from './modules/public/auth/auth-routing.module';
import { DashboardAdminComponent } from './modules/container/dashboard-admin/dashboard-admin.component';
import { ROUTESDASHBOARD } from './utilities/dashboard';


const routes: Routes = [

  { path: '', children: ROUTESLANDSCAPES },
  { path: 'private', component: DashboardAdminComponent, children: ROUTESDASHBOARD }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
