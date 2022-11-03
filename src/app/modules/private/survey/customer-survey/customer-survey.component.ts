import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from 'src/app/services/answer.service';
import { CommentService } from 'src/app/services/comment.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-survey',
  templateUrl: './customer-survey.component.html',
  styleUrls: ['./customer-survey.component.css']
})
export class CustomerSurveyComponent implements OnInit {

  formAnswer: FormGroup;
  public questionArray: any[] = [];
  public jsonReqArray: any[] = [];


  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private answerService: AnswerService, private commentService: CommentService) {
    this.formAnswer = this.formBuilder.group({
      option_id: ["", Validators.required],
      question_id: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCustomer();

  }

  getCustomer() {
    this.customerService.getCustomer("/question/").subscribe((res) => {
      this.questionArray = res.question;
    });
  }

  pushArray(questionId: number, optionId: number) {
    var jsonReq = {
      "option_id": optionId,
      "question_id": questionId
    }

    if (this.jsonReqArray.length != 0) {
      const answer = this.jsonReqArray.find(answer => answer.question_id === questionId);
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

  submitAnswerSurvey() {
    this.jsonReqArray.forEach(body => {
      console.log(body);
      this.answerService.addAnswer(body).subscribe((message) => {
        if (message == "OK") {
          console.log('🤗');
        } else {
          console.log('😥', message.error);
        }
      });
    });

    const commentContent = document.getElementById("comment-area") as HTMLTextAreaElement;

    if (commentContent.value != "") {
      this.commentService.addComment(1, commentContent.value).subscribe((message) => {
        if (message = "OK") {
          console.log('🤗');
        } else {
          console.log('😥', message.error);
        }
      })
    }

  }

  cleanSurvey() {
    this.jsonReqArray = [];
    console.log("Encuesta limpiada "+ this.jsonReqArray);
    
  }

}
