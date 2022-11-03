import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { NavbarDashComponent } from './navbar-dash/navbar-dash.component';
import { SidebarDashComponent } from './sidebar-dash/sidebar-dash.component';
import { FooterDashComponent } from './footer-dash/footer-dash.component';



@NgModule({
  declarations: [
    NavbarDashComponent,
    SidebarDashComponent,
    FooterDashComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarDashComponent,
    SidebarDashComponent,
    FooterDashComponent
  ]
})
export class SharedModule { }
