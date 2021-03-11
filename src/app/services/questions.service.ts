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
  private exam: Exam | undefined;

  constructor(private readonly http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Exam> {
    return this.getExamFromAPI();
  }

  getExam(): Readonly<Exam> {
    return this.exam as Exam;
  }

  private getExamFromAPI(): Observable<Exam> {
    return this.http.get<Exam>('assets/questions.json').pipe(tap(exam => this.exam = exam));
  }
}
