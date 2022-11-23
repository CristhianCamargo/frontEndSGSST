import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailPatterm: any = /^[a-z]+.[a-z]+@usantoto.edu.co$/;
  formAuth: FormGroup;
  errorMessage!: string;
  customer!: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private customerService: CustomerService
  ) {
    this.formAuth = this.formBuilder.group({
      access_email: ['', Validators.required],
      access_pass: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  login() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    this.spinner.show();
    this.authService.dataAuth(this.formAuth.value).subscribe((res) => {
      if (res === 'OK') {
        //this.router.navigate(['private/dashboard/home']);
        this.validateRole();
        this.valClass();
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.errorMessage = res;
        console.log(this.errorMessage);
        if (this.errorMessage) {
          Toast.fire({
            icon: 'error',
            title: 'Credenciales invalidas',
          });
        }
      }
    });
  }

  validateRole() {
    this.customer = this.customerService.getCustomerAuth();
    if (this.customer.roleId == 1) {
      this.router.navigate(['private/dashboard/home']);

    } else {
      this.router.navigate(['private-customer/dashboard-customer/home']);
    }
  }

  valClass(){
    this.customer = this.customerService.getCustomerAuth();
    const body = document.getElementsByTagName('body')[0];
    if (this.customer.roleId == 1) {
      body.classList.remove('layout-top-nav')
      body.classList.add('layout-navbar-fixed')
    } else {
      body.classList.remove('layout-navbar-fixed')
      body.classList.add('layout-top-nav')
    }
  }

  get access_email() {
    return this.formAuth.get('access_email');
  }
}
