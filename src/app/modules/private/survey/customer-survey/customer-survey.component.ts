import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnswerService } from 'src/app/services/answer.service';
import { CommentService } from 'src/app/services/comment.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-survey',
  templateUrl: './customer-survey.component.html',
  styleUrls: ['./customer-survey.component.css'],
})
export class CustomerSurveyComponent implements OnInit {
  formAnswer: FormGroup;
  public questionArray: any[] = [];
  public jsonReqArray: any[] = [];
  public customer: any;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private answerService: AnswerService,
    private commentService: CommentService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.formAnswer = this.formBuilder.group({
      option_id: ['', Validators.required],
      question_id: ['', Validators.required],
    });
    this.customer = this.customerService.getCustomerAuth();
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomer('/question/').subscribe((res) => {
      this.questionArray = res.question;
    });
  }

  pushArray(questionId: number, optionId: number) {
    var jsonReq = {
      option_id: optionId,
      question_id: questionId,
    };

    if (this.jsonReqArray.length != 0) {
      const answer = this.jsonReqArray.find(
        (answer) => answer.question_id === questionId
      );
      if (answer) {
        answer.option_id = optionId;
      } else {
        this.jsonReqArray.push(jsonReq);
      }
    } else {
      this.jsonReqArray.push(jsonReq);
    }

    console.log(this.jsonReqArray);
  }

  updateCustomerStateLocalStorage() {
    this.customerService.updateCustomerStateLocalStorage().subscribe((res) => {

      if (res.message == 'OK') {

        localStorage.setItem('authCredential', JSON.stringify(res.resTmp));
      }
    })
  }

  submitAnswerSurvey() {
    this.customer = this.customerService.getCustomerAuth();
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
    if (this.jsonReqArray.length == this.questionArray.length) {
      this.jsonReqArray.forEach((body) => {
        console.log(body);
        this.answerService.addAnswer(body).subscribe((message) => {

          if (message == 'OK') {
            console.log('🤗');
            this.updateCustomerStateLocalStorage();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Encuesta completada',
              showConfirmButton: false,
              timer: 1000
            });
            if (this.customer.roleId == 1) {
              this.spinner.hide();
              this.router.navigate(['/private/dashboard/home']);
            } else {
              this.spinner.hide();
              this.router.navigate(['/private-customer/dashboard-customer/home']);
            }
          } else {
            console.log('😥', message.error);
          }
        });
      });
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Todas las preguntas deben tener respuesta',
      });
    }

    const commentContent = document.getElementById(
      'comment-area'
    ) as HTMLTextAreaElement;

    if (commentContent.value != '') {
      this.commentService
        .addComment(1, commentContent.value)
        .subscribe((message) => {
          if ((message = 'OK')) {
            console.log('🤗');
          } else {
            console.log('😥', message.error);
          }
        });
    }
  }
}
