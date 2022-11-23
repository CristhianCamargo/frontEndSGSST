import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { NavbarDashComponent } from './navbar-dash/navbar-dash.component';
import { SidebarDashComponent } from './sidebar-dash/sidebar-dash.component';
import { FooterDashComponent } from './footer-dash/footer-dash.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NavbarCustomerDashComponent } from './navbar-customer-dash/navbar-customer-dash.component';



@NgModule({
  declarations: [
    NavbarDashComponent,
    SidebarDashComponent,
    FooterDashComponent,
    UnauthorizedComponent,
    NavbarCustomerDashComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarDashComponent,
    SidebarDashComponent,
    FooterDashComponent,
    NavbarCustomerDashComponent
  ]
})
export class SharedModule { }
