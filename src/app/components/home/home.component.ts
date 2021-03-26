import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numberOfQuestions = 0;
  duration = 0;

  constructor(private questionSrv: QuestionsService) {
    const { duration, questions } = questionSrv.getExam();
    this.numberOfQuestions = questions.length;
    this.duration = duration;
  }

  ngOnInit(): void {
  }

}
