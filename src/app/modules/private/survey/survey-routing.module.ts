import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticSurveyComponent } from './analytic-survey/analytic-survey.component';
import { CommentSurveyComponent } from './comment-survey/comment-survey.component';
import { CustomerSurveyComponent } from './customer-survey/customer-survey.component';
import { ResultCustomerSurveyComponent } from './result-customer-survey/result-customer-survey.component';

const routes: Routes = [
  {path: "customerSurvey", component: CustomerSurveyComponent},
  {path: "commentSurvey", component: CommentSurveyComponent},
  {path: "analyticSurvey", component: AnalyticSurveyComponent},
  {path: "resultCustomerSurvey", component: ResultCustomerSurveyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
