import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailPatterm: any = /^[a-z]+.[a-z]+@usantoto.edu.co$/;
  formAuth: FormGroup;
  errorMessage!: string;


  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private spinner: NgxSpinnerService) {
    this.formAuth = this.formBuilder.group({
      access_email: ["", Validators.required],
      access_pass: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login() {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    this.spinner.show();
    this.authService.dataAuth(this.formAuth.value).subscribe((res) => {
      if (res === "OK") {
        this.router.navigate(['private/dashboard/home']);
        this.spinner.hide();

      } else {
        this.spinner.hide();
        this.errorMessage = res;
        console.log(this.errorMessage);
        if (this.errorMessage) {
          Toast.fire({
            icon: 'error',
            title: 'Credenciales invalidas'
          })
        }
      }
    })

  }

  get access_email() { return this.formAuth.get("access_email"); }

}
