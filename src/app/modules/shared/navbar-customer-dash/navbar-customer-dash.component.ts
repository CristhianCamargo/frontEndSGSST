import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-navbar-customer-dash',
  templateUrl: './navbar-customer-dash.component.html',
  styleUrls: ['./navbar-customer-dash.component.css']
})
export class NavbarCustomerDashComponent implements OnInit {

  customer: any;

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    this.customer = this.customerService.getCustomerAuth();
  }

  logOut() {
    localStorage.clear();
    this.router.navigate([""]);
  }

}
