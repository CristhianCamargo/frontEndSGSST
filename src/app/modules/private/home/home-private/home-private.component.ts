import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-home-private',
  templateUrl: './home-private.component.html',
  styleUrls: ['./home-private.component.css']
})
export class HomePrivateComponent implements OnInit {

  public customer: any;


  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  btnSurveyRoute() {
    this.customer = this.customerService.getCustomerAuth();
    if (this.customer.roleId == 1) {
      this.router.navigate(['/private/dashboard/survey/customerSurvey']);
    } else {
      this.router.navigate(['/private-customer/dashboard-customer/survey/customerSurvey']);
    }
  }

}
