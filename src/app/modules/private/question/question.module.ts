import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

import { QuestionRoutingModule } from './question-routing.module';
import { AdminQuestionComponent } from './admin-question/admin-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AdminQuestionComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class QuestionModule { }
