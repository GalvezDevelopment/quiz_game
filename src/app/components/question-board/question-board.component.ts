import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { Question } from '../../shared/models/models';
import { Router } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { finalize, map, scan, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-question-board',
  templateUrl: './question-board.component.html',
  styleUrls: ['./question-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionBoardComponent implements OnInit {
  public buttonTexts = ['NEXT', 'FINISH'];
  public questions: Array<Question> = [];
  public active = 0;
  public buttonText: string;
  public timer: Observable<string>;

  get correctAnswers(): number {
    return this.questionSrv.getScore();
  }

  get examStatus(): string {
    return this.questionSrv.getScore() >= this.questionSrv.getExam().atLeast ? 'PASSED' : 'FAILED';
  }

  constructor(private readonly questionSrv: QuestionsService, private routes: Router, private dc: ChangeDetectorRef) {
    this.buttonText = this.buttonTexts[0];
    this.timer = this.initCounter();
  }

  ngOnInit(): void {
    this.questions = this.questionSrv.getExam().questions;
  }

  saveAnswer(index: number, answer: string | string[]): void {
    this.questionSrv.setAnswer(index, answer);
  }

  next(): void {
    ++this.active;
    if (this.buttonText === 'FINISH') {
      this.routes.navigate(['/']);
    }
    this.buttonText = this.active === this.questions.length ? this.buttonTexts[1] : this.buttonTexts[0];
  }

  private timeOut(): void {
    this.active = this.questions.length;
    this.buttonText = this.buttonTexts[1];
    this.dc.detectChanges();
  }

  private initCounter(): Observable<string> {
    const maxTime = this.questionSrv.getExam().duration * 60 * 1000;
    return interval(1000).pipe(
      scan((acc, next) => acc - 1000, maxTime),
      takeWhile(time => time > -1),
      map(time => {
        let seconds = time / 1000;
        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        return `${ minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 }) }:${ seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 }) }`;
      }),
      finalize(() => this.timeOut())
    );
  }

}
