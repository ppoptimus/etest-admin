import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-report-router',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportAllRouter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

