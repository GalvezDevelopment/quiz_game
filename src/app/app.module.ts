import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionBoardComponent } from './components/question-board/question-board.component';
import { QuestionComponent } from './components/question/question.component';
import { HomeComponent } from './components/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionBoardComponent,
    QuestionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
