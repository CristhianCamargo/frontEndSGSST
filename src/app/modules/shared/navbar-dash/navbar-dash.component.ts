import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-navbar-dash',
  templateUrl: './navbar-dash.component.html',
  styleUrls: ['./navbar-dash.component.css'],
  
})
export class NavbarDashComponent implements OnInit {

  customer : any;

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    this.customer = this.customerService.getCustomerAuth();
  }

  logOut(){
    localStorage.clear();
    this.router.navigate([""]);
  }

}
