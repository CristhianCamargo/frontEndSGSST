import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class RoleValidateGuard implements CanActivate {

  constructor(private customerService: CustomerService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkCustomer(route);
  }
  /*
  checkCustomer2(route: ActivatedRouteSnapshot) {
    const customer: any = this.customerService.getCustomerAuth();
    const { scopes = [] } = this.customerService.getCustomerAuth();
    if (scopes.includes(customer.roleId)) {
      return true;
    } else {
      console.log(customer.roleId);
      this.router.navigate(['error/unauthorized']);
      return false;
    }
  }
  */

  checkCustomer(route: ActivatedRouteSnapshot) {
    const customer: any = this.customerService.getCustomerAuth();
    if (route.data["role"].includes(customer.roleId)) {
      console.log(customer.roleId);
      return true;
    } else {
      console.log(customer.roleId);
      this.router.navigate(['error/unauthorized']);
      return false;
    }
  }

}
