import { Component, OnInit, } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from 'src/app/services/answer.service';
import { CustomerService } from 'src/app/services/customer.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-question',
  templateUrl: './admin-question.component.html',
  styleUrls: ['./admin-question.component.css']
})
export class AdminQuestionComponent implements OnInit {

  public questionArray: any[] = [];
  public answerArray: any[] = [];
  public pointArray: any[] = [];
  public countAnswerByOptionMS = 0;
  public countAnswerByOptionS = 0;
  public countAnswerByOptionAS = 0;
  public countAnswerByOptionI = 0;
  public countAnswerByOptionMI = 0;
  public countAnswerByQuestion: any[] = [];
  public resultOptionsId = 0;
  public average = 0;
  public satistactionLevel = "";
  public countAnswerByOQ = 0;
  formQuestion: FormGroup;
  formUpdateQuestion: FormGroup;
  modal!: NgbModalRef;
  questionIdSelect!: number;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private answerService: AnswerService, private questionService: QuestionService, private modalService: NgbModal) {
    this.formQuestion = this.formBuilder.group({
      survey_id: ["1", Validators.required],
      question_content: ["", Validators.required]
    })
    this.formUpdateQuestion = this.formBuilder.group({
      survey_id: ["1", Validators.required],
      question_content: ["", Validators.required]
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getQuestion();
    this.getAnswerByOption();
    this.getSatisfactionByQuestion();
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
    this.customerService.getCustomer("/answer/").subscribe((res) => {
      this.answerArray = res.question;
    });
  }

  addQuestion() {
    const {
      survey_id,
      question_content
    } = this.formQuestion.value;

    this.questionService.addQuestion(survey_id, question_content).subscribe((message) => {
      if (message == "OK") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pregunta agregada',
          showConfirmButton: false,
          timer: 1000
        });
        this.getQuestion();
        this.formQuestion.reset();
        console.log('🤗');
      } else {
        console.log('😥', message.error);
      }
    });
  }

  updateQuestion() {
    const {
      survey_id,
      question_content
    } = this.formUpdateQuestion.value;

    this.questionService.updateQuestion(this.questionIdSelect, survey_id, question_content).subscribe((message) => {
      if (message == "OK") {
        this.closeModal();
        this.formUpdateQuestion.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pregunta actualizada',
          showConfirmButton: false,
          timer: 1000
        });
        this.getQuestion();
        console.log('🤗');
      } else {
        console.log('😥', message.error);
      }
    });
  }

  getAnswerByOption() {
    this.answerService.getAnswerByOption(1).subscribe((res) => {
      this.countAnswerByOptionMI = res.answerByOption.length;
    });
    this.answerService.getAnswerByOption(2).subscribe((res) => {
      this.countAnswerByOptionI = res.answerByOption.length;
    });
    this.answerService.getAnswerByOption(3).subscribe((res) => {
      this.countAnswerByOptionAS = res.answerByOption.length;
    });
    this.answerService.getAnswerByOption(4).subscribe((res) => {
      this.countAnswerByOptionS = res.answerByOption.length;
    });
    this.answerService.getAnswerByOption(5).subscribe((res) => {
      this.countAnswerByOptionMS = res.answerByOption.length;

    });
  }

  getSatisfactionByQuestion() {
    return new Promise<void>((resolve, reject) => {
      for (let i = 0; i < this.questionArray.length; i++) {
        this.answerService.getAnswerByQuestion(this.questionArray[i].questionId).subscribe((res) => {
          this.countAnswerByQuestion = res.answerByQuestion;

          this.operation();
          let jsonTmp: any = {}
          jsonTmp["point"] = this.average;
          jsonTmp["satisfaction"] = this.satistactionCalc(this.average);
          this.pointArray[this.questionArray[i].questionId] = jsonTmp;
          resolve();

        });
      }
    });
  }

  operation() {
    this.resultOptionsId = 0;
    for (let i = 0; i < this.countAnswerByQuestion.length; i++) {
      this.resultOptionsId += this.countAnswerByQuestion[i].optionId;
    }
    console.log(this.resultOptionsId);
    this.average = (this.resultOptionsId * 100) / (this.countAnswerByQuestion.length * 5);
    this.satistactionCalc(this.resultOptionsId);
    console.log(this.average);

  }

  satistactionCalc(result: number): any {
    if (result <= 20) {
      this.satistactionLevel = "Muy Insatisfecho"
    }
    if (result > 20 && result <= 40) {
      this.satistactionLevel = "Insatisfecho"
    }
    if (result > 40 && result <= 60) {
      this.satistactionLevel = "Algo Satisfecho"
    }
    if (result > 60 && result <= 80) {
      this.satistactionLevel = "Satisfecho"
    }
    if (result > 80 && result <= 100) {
      this.satistactionLevel = "Muy Satisfecho"
    }

    return this.satistactionLevel;
  }

  getAnswerByOptionQuestion(optionId: number, questionId: number): any {
    let count;
    this.answerService.getAnswerByOQ(optionId, questionId).subscribe((res) => {
      count = res.answerByOpAndQues.length;
    });

    return count;
  }

  deleteQuestion(question_id: number) {
    Swal.fire({
      title: '¿Esta seguro de borrar la pregunta?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(question_id).subscribe((message) => {
          if (message = "OK") {
            console.log('🤗');
            this.getQuestion();
            Swal.fire('Pregunta eliminada', '', 'success')
          } else {
            console.log('😥', "Ocurrio un error");
            Swal.fire('Hubo un error', '', 'error')
          }
        })

      }
    })
  }
  openModal(content: any, id: any) {
    this.modal = this.modalService.open(content, { size: 'lg', centered: true, backdrop: false })
    this.questionIdSelect = id;

  }

  closeModal() {
    this.modal.close();
  }

}
