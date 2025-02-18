import { Component, OnInit } from '@angular/core';
import { AnswerService } from 'src/app/services/answer.service';
import { CustomerService } from 'src/app/services/customer.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-result-customer-survey',
  templateUrl: './result-customer-survey.component.html',
  styleUrls: ['./result-customer-survey.component.css']
})
export class ResultCustomerSurveyComponent implements OnInit {

  customer: any;
  public questionArray: any[] = [];
  public answerArray: any[] = [];
  public countAnswerByCustomer: any = 0;
  public average: any = 0;
  public averageGeneral: any = 0;
  public satisfaction: any = "";
  public satisfactionGeneral: any = "";
  public arrayAnswerByQuestion: any[] = [];
  public arrayOption: any[] = [];
  public arrayOptionAnswer: any[] = []

  constructor(private customerService: CustomerService, private answerService: AnswerService) { }

  async ngOnInit(): Promise<void> {
    this.customer = this.customerService.getCustomerAuth();
    await this.getQuestion();
    await this.getAnswer();
    await this.getAnswerByCustomer();
    await this.getAnswerByQuestionAndCustomer();
    await this.getAnswerByQuestionCustomer();
  }

  getQuestion() {
    return new Promise<void>((resolve, reject) => {
      this.customerService.getCustomer("/question/").subscribe((res) => {
        this.questionArray = res.question;
        resolve();
      });
    });
  }

  getAnswer() {
    return new Promise<void>((resolve, reject) => {
      this.customerService.getCustomer("/answer/").subscribe((res) => {
        this.answerArray = res.answer;
        this.operationGeneral();
        resolve();
      });
    });
  }

  operationGeneral() {
    let resultOptionsId = 0;
    for (let i = 0; i < this.answerArray.length; i++) {
      resultOptionsId += this.answerArray[i].optionId;

    }
    this.averageGeneral = (resultOptionsId * 100) / (this.answerArray.length * 5);

    this.averageGeneral = Math.floor(this.averageGeneral);

    this.satisfactionGeneral = this.satistactionCalc(this.averageGeneral);
  }


  /**
   * Nivel de satisfacción del cliente
   */
  getAnswerByCustomer() {
    return new Promise<void>((resolve, reject) => {

      this.answerService.getAnswerByCustomer(this.customer.customerId).subscribe((res) => {
        this.countAnswerByCustomer = res.answerByCustomer;
        this.arrayOption = res.answerByCustomer;

        this.operation();
        resolve();
      });
    });
  }

  operation() {
    let resultOptionsId = 0;
    for (let i = 0; i < this.countAnswerByCustomer.length; i++) {
      resultOptionsId += this.countAnswerByCustomer[i].optionId;
    }
    this.average = (resultOptionsId * 100) / (this.countAnswerByCustomer.length * 5);

    this.average = Math.floor(this.average);

    this.satisfaction = this.satistactionCalc(this.average);
  }

  satistactionCalc(result: number): any {
    let satisfactionLevel: string;
    if (result <= 20) {
      satisfactionLevel = "Muy Insatisfecho"
    }
    if (result > 20 && result <= 40) {
      satisfactionLevel = "Insatisfecho"
    }
    if (result > 40 && result <= 60) {
      satisfactionLevel = "Algo Satisfecho"
    }
    if (result > 60 && result <= 80) {
      satisfactionLevel = "Satisfecho"
    }
    if (result > 80 && result <= 100) {
      satisfactionLevel = "Muy Satisfecho"
    }

    return satisfactionLevel!;
  }

  getAnswerByQuestionAndCustomer() {
    return new Promise<void>((resolve, reject) => {
      let responseTmp: any;
      for (let i = 0; i < this.questionArray.length; i++) {
        this.answerService.getAnswerByQuestionAndCustomer(this.questionArray[i].questionId).subscribe((res) => {
          responseTmp = res.answerByQuestionCustomer;

          this.arrayAnswerByQuestion[this.questionArray[i].questionId] = JSON.stringify(responseTmp)
          resolve();
        });
      }
    }
    );
  }

  getAnswerByQuestionCustomer() {
    return new Promise<void>((resolve, reject) => {
      for (let i = 0; i < this.arrayOption.length; i++) {
        this.arrayOptionAnswer[this.arrayOption[i].questionId] = this.arrayOption[i].answer_option.option_name;
        resolve();
      }
    });
  }

  updateCustomerStateLocalStorage() {
    this.customerService.updateCustomerStateLocalStorage().subscribe((res) => {

      if (res.message == 'OK') {

        localStorage.setItem('authCredential', JSON.stringify(res.resTmp));
      }
    })
  }

}
