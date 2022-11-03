import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminQuestionComponent } from './admin-question/admin-question.component';

const routes: Routes = [
  { path: 'admin', component: AdminQuestionComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
