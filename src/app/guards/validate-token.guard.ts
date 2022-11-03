import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | boolean | UrlTree {
    const customerToken = localStorage.getItem("authToken");
    let validate: boolean = true;

    if (!customerToken) {
      this.router.navigate(["auth/login"]);
      validate = false;
    }

    return validate;
  }


  canLoad(): Observable<boolean | UrlTree> | boolean | UrlTree {
    const customerToken = localStorage.getItem("authToken");
    let validate: boolean = true;

    if (!customerToken) {
      this.router.navigate(["auth/login"]);
      validate = false;
    }

    return validate;
  }


}
