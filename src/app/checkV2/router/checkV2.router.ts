import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-perm-router',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckV2RouterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

