import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { controlError, ResTmp } from 'src/app/api/interface';
import { AnswerService } from 'src/app/services/answer.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ValidatorService } from 'src/app/services/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css'],
})
export class AdminCustomerComponent implements OnInit {
  get documentErrorMsg(): string {
    const error = this.formUpdateCustomer.get('customer_document')?.errors;
    if (error?.['required']) {
      return 'Campo requerido';
    } else if (error?.['max']) {
      return 'Longitud máxima de 10 digitos';
    } else if (this.errorObj.document) {
      return this.errorObj.message;
    }
    return '';
  }

  public customerArray: any[] = [];
  public customerByStateArray: any[] = [];
  public countCustomer: any = 0;
  public countAnswerByCustomer: any = 0;
  public countCustomerByStateTrue: any = 0;
  public countCustomerByStateFalse: any = 0;
  public document: string = "";
  public average: any = 0;
  public pointArray: any[] = [];
  public roleArray: any[] = [];
  public surveyArray: any[] = [];
  public errorObj: controlError = { ok: false, message: '', document: false };
  customer!: ResTmp;
  modal!: NgbModalRef;
  customerIdSelect!: number;
  formUpdateCustomer: FormGroup;
  page_size: number = 10;
  page_number: number = 1;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private answerService: AnswerService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private validatorService: ValidatorService
  ) {
    this.formUpdateCustomer = this.formBuilder.group({
      role_id: ['', Validators.required],
      survey_id: ['', Validators.required],
      customer_document: ['', Validators.required],
      customer_firstname: ['', Validators.required],
      customer_lastname: ['', Validators.required],
      customer_phone: ['', Validators.required],
      access_email: ['', Validators.required],
      access_pass: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getCustomer();
    await this.getRole();
    await this.getSurvey();
    this.getCustomerByStateTrue();
    this.getCustomerByStateFalse();
    this.getAnswerByCustomer();
  }

  getCustomer() {
    return new Promise<void>((resolve, reject) => {
      this.customerService.getCustomer('/customer/').subscribe((res) => {
        this.customerArray = res.resTmp;
        this.countCustomer = this.customerArray.length;
        resolve();
      });
    });
  }

  getCustomerById() {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.customerService.getCustomerById(this.customerIdSelect).subscribe((res) => {
        this.customer = res.resTmp;
        this.formUpdateCustomer.get('role_id')?.setValue(this.customer.roleId);
        this.formUpdateCustomer.get('survey_id')?.setValue(this.customer.surveyId);
        this.formUpdateCustomer.get('customer_document')?.setValue(this.customer.customerDocument);
        this.formUpdateCustomer.get('customer_firstname')?.setValue(this.customer.customerFirstname);
        this.formUpdateCustomer.get('customer_lastname')?.setValue(this.customer.customerLastname);
        this.formUpdateCustomer.get('customer_phone')?.setValue(this.customer.customerPhone);
        this.formUpdateCustomer.get('access_email')?.setValue(this.customer.access?.accessEmail);
        this.spinner.hide();
        resolve();
      });
    });
  }

  getRole() {
    return new Promise<void>((resolve, reject) => {
      this.customerService.getCustomer('/role/').subscribe((res) => {
        this.roleArray = res.role;
        resolve();
      });
    });
  }

  getSurvey() {
    return new Promise<void>((resolve, reject) => {
      this.customerService.getCustomer('/survey/').subscribe((res) => {
        this.surveyArray = res.survey;
        resolve();
      });
    });
  }

  getCustomerByStateTrue() {
    this.customerService.getCustomerByState('/true/').subscribe((res) => {
      this.customerByStateArray = res.customerByState;
      this.countCustomerByStateTrue = Object.keys(res.customerByState).length;
    });
  }
  getCustomerByStateFalse() {
    this.customerService.getCustomerByState('/false/').subscribe((res) => {
      this.customerByStateArray = res.customerByState;
      this.countCustomerByStateFalse = Object.keys(res.customerByState).length;
    });
  }

  getAnswerByCustomer() {
    return new Promise<void>((resolve, reject) => {
      for (let i = 0; i < this.customerArray.length; i++) {
        this.answerService
          .getAnswerByCustomer(this.customerArray[i].customerId)
          .subscribe((res) => {
            this.countAnswerByCustomer = res.answerByCustomer;

            this.operation();
            let jsonTmp: any = {};
            jsonTmp['point'] = this.average;
            jsonTmp['satisfaction'] = this.satistactionCalc(this.average);
            this.pointArray[this.customerArray[i].customerId] = jsonTmp;
            resolve();
          });
      }
    });
  }

  operation() {
    let resultOptionsId = 0;
    for (let i = 0; i < this.countAnswerByCustomer.length; i++) {
      resultOptionsId += this.countAnswerByCustomer[i].optionId;
    }
    this.average =
      (resultOptionsId * 100) / (this.countAnswerByCustomer.length * 5);
    this.satistactionCalc(resultOptionsId);
  }

  satistactionCalc(result: number): any {
    let satisfactionLevel: string;
    if (result <= 20) {
      satisfactionLevel = 'Muy Insatisfecho';
    }
    if (result > 20 && result <= 40) {
      satisfactionLevel = 'Insatisfecho';
    }
    if (result > 40 && result <= 60) {
      satisfactionLevel = 'Algo Satisfecho';
    }
    if (result > 60 && result <= 80) {
      satisfactionLevel = 'Satisfecho';
    }
    if (result > 80 && result <= 100) {
      satisfactionLevel = 'Muy Satisfecho';
    }

    return satisfactionLevel!;
  }

  deleteCustomer(customer_id: number) {
    Swal.fire({
      title: '¿Esta seguro de borrar este usuario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService
          .deleteCustomer(customer_id)
          .subscribe((message) => {
            if ((message = 'OK')) {
              console.log('🤗');
              this.getCustomer();
              Swal.fire('Usuario eliminado', '', 'success');
            } else {
              console.log('😥', 'Ocurrio un error');
              Swal.fire('Hubo un error', '', 'error');
            }
          });
      }
    });
  }

  openModal(content: any, id: any) {
    this.customerIdSelect = id;
    this.getCustomerById();
    this.modal = this.modalService.open(content, {
      size: 'lg',
      centered: true,
      backdrop: false,
    });
  }

  closeModal() {
    this.modal.close();
  }

  invalidInput(field: string) {
    return (
      this.formUpdateCustomer.get(field)?.invalid &&
      this.formUpdateCustomer.get(field)?.touched
    );
  }

  validateDocument() {

    const doc = this.formUpdateCustomer.get('customer_document')?.value
    const body = {
      customerId: this.customerIdSelect,
      customerDocument: doc.toString()
    }
    this.validatorService.getValidationBody('/validation/documentUp', body).subscribe((res) => {

      if (res == true) {
        this.errorObj = res;

      } else {
        this.errorObj = res;
        this.formUpdateCustomer.get("customer_document")?.setErrors({ yaExiste: true });
      }
    });

  }

  updateCustomer() {
    this.spinner.show()
    this.customerService.updateCustomer(this.customerIdSelect, this.formUpdateCustomer.value).subscribe((res) => {
      if ((res == 'OK')) {
        console.log('🤗');
        this.spinner.hide()
        this.getCustomer();
        Swal.fire('Usuario actualizado', '', 'success');
        this.closeModal();
      } else {
        this.spinner.hide()
        console.log('😥', 'Ocurrio un error');
        Swal.fire('Hubo un error', '', 'error');
      }
    });
  }
}
