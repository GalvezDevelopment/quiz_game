import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionBoardComponent } from './components/question-board/question-board.component';
import { QuestionsService } from './services/questions.service';

const routes: Routes = [
  {
    path: 'questions',
    component: QuestionBoardComponent
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    resolve: {
      exam: QuestionsService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
