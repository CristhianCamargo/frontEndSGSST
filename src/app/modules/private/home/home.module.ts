import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePrivateComponent } from './home-private/home-private.component';
import { ContainerModule } from '../../container/container.module';


@NgModule({
  declarations: [
    HomePrivateComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ContainerModule
  ]
})
export class HomeModule { }
