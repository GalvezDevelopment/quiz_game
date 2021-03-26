import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exam } from '../shared/models/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService implements Resolve<Exam> {
  private exam: Exam;

  constructor(private readonly http: HttpClient) {
    this.exam = { title: 'No Exam available!', duration: 0, atLeast: 0, questions: [] };
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Exam> {
    return this.getExamFromAPI();
  }

  /**
   * Get the readonly quiz object with all information.
   */
  getExam(): Readonly<Exam> {
    return this.exam as Exam;
  }

  /**
   * Save the user answer in the exam object.
   * @param index Index of the answer.
   * @param answer User answer
   */
  setAnswer(index: number, answer: string | string[]): void {
    this.exam.questions[index].userAnswer = answer;
  }

  /**
   * Get the number of correct answers.
   */
  getScore(): number {
    return this.exam.questions.filter(q => {
      if (typeof q.answer === 'string') {
        return q.answer === q.userAnswer;
      } else if (typeof q.answer === 'object' && Array.isArray(q.userAnswer) && q.answer.length === q.userAnswer.length) {
        return q.answer.every((answer, i) => q.userAnswer.includes(answer));
      }
      return false;
    }).length;
  }

  private getExamFromAPI(): Observable<Exam> {
    return this.http.get<Exam>('assets/questions.json').pipe(tap(exam => this.exam = exam));
  }
}
