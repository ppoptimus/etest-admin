import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'question-log-router',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionLogRouter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

