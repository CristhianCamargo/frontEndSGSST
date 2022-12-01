import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { controlError } from 'src/app/api/interface';
import { CustomerService } from 'src/app/services/customer.service';
import { ValidatorService } from 'src/app/services/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  get documentErrorMsg(): string {
    const error = this.formCustomer.get('customer_document')?.errors
    if (error?.['required']) {
      return "Campo requerido"
    } else if (error?.['max']) {
      return "Longitud máxima de 10 digitos"
    } else if (this.errorObj.ok) {
      return this.errorObj.message;
    }
    return "";
  }

  get emailErrorMsg(): string {
    const error = this.formCustomer.get('access_email')?.errors
    if (error?.['required']) {
      return "Campo requerido"
    } else if (error?.['max']) {
      return "Solo correos institucionales"
    }
    return "";
  }

  formCustomer: FormGroup;
  emailPattern: any = /^[a-z]+.[a-z]+@usantoto.edu.co$/;
  public roleArray: any[] = [];
  public surveyArray: any[] = [];
  public errorObj: controlError = { ok: false, message: "" };


  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private validatorService: ValidatorService) {

    this.formCustomer = this.formBuilder.group({
      role_id: ["1", Validators.required],
      survey_id: ["1", Validators.required],
      customer_document: ["", [Validators.required, Validators.max(9999999999)]],
      customer_firstname: ["", Validators.required],
      customer_lastname: ["", Validators.required],
      customer_phone: ["", Validators.required],
      customer_state: [false, Validators.required],
      access_email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      access_pass: ["", Validators.required],
      access_pass_confirm: ["", Validators.required]
    },
      { validators: [this.verifyPass('access_pass', 'access_pass_confirm')] }
    );
  }

  ngOnInit(): void {
    this.getRole();
    this.getSurvey();


  }

  getRole() {
    this.customerService.getCustomer("/role/").subscribe((res) => {
      this.roleArray = res.role;
    });
  }
  getSurvey() {
    this.customerService.getCustomer("/survey/").subscribe((res) => {
      this.surveyArray = res.survey;
    });
  }

  create() {
    const {
      role_id,
      survey_id,
      customer_document,
      customer_firstname,
      customer_lastname,
      customer_phone,
      customer_state,
      access_email,
      access_pass
    } = this.formCustomer.value;
    
    this.customerService.addCustomer(role_id,
      survey_id,
      customer_document.toString(),
      customer_firstname,
      customer_lastname,
      customer_phone.toString(),
      customer_state,
      access_email,
      access_pass).subscribe((message) => {
        if (message == "OK") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario Creado',
            showConfirmButton: false,
            timer: 1000
          });
          this.formCustomer.reset();
          console.log('🤗');
        } else {
          console.log('😥', message.error);
        }
      });
  }

  verifyPass(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const clave1 = formGroup.get(campo1)?.value;
      const clave2 = formGroup.get(campo2)?.value;

      if (clave1 !== clave2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true };
      }

      formGroup.get(campo2)?.setErrors(null);

      return null;
    };
  }

  invalidInput(field: string) {
    return (this.formCustomer.get(field)?.invalid && this.formCustomer.get(field)?.touched);
  }

  validateDocument() {
    const customerDocument = this.formCustomer.get('customer_document')?.value;
    this.validatorService.getValidation('/validation/document/', customerDocument).subscribe((res) => {

      if (res == true) {
        this.errorObj = res;

      } else {
        this.errorObj = res;
      }
    });

  }


}
