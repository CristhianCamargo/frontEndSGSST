import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-sidebar-dash',
  templateUrl: './sidebar-dash.component.html',
  styleUrls: ['./sidebar-dash.component.css']
})
export class SidebarDashComponent implements OnInit {

  public customer: any;
  
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customer = this.customerService.getCustomerAuth();
  }

}
