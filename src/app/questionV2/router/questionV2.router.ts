import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'question-router',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionV2RouterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

