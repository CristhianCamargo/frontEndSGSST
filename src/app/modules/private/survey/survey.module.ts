import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { CustomerSurveyComponent } from './customer-survey/customer-survey.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalyticSurveyComponent } from './analytic-survey/analytic-survey.component';
import { CommentSurveyComponent } from './comment-survey/comment-survey.component';
import { ResultCustomerSurveyComponent } from './result-customer-survey/result-customer-survey.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    CustomerSurveyComponent,
    AnalyticSurveyComponent,
    CommentSurveyComponent,
    ResultCustomerSurveyComponent,
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SurveyModule { }
