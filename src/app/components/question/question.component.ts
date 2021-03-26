import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../shared/models/models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() index: number;
  @Input() data: Question | undefined;
  @Output() answer = new EventEmitter<string | string[]>();
  private checkboxSelections: string[] = [];

  constructor() {
    this.index = 0;
  }

  ngOnInit(): void {
  }

  putAnswer(answer: string): void {
    switch (this.data?.control) {
      case 'checkbox':
        if (!this.checkboxSelections.includes(answer)) {
          this.checkboxSelections.push(answer);
        } else {
          this.checkboxSelections.splice(this.checkboxSelections.indexOf(answer), 1);
        }
        this.answer.next(this.checkboxSelections);
        break;
      default:
        this.answer.next(answer);
    }
  }

}
