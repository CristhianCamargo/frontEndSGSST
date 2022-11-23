import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'EncuestaSGSST';
  customer! : any;

  constructor(private customerService: CustomerService){

  }

  ngOnInit(): void {
    this.customer = this.customerService.getCustomerAuth();
    console.log(this.customer);
    
    this.valClass();
  }

  valClass(){
    const body = document.getElementsByTagName('body')[0];
    if (this.customer.roleId == 1) {
      body.classList.add('layout-navbar-fixed')
    } else {
      body.classList.add('layout-top-nav')
    }
  }
}
